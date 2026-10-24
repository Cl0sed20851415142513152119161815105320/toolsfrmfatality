import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  DEFAULT_SETTINGS,
  makeOrderId,
  parseCart,
  parseOrders,
  parseSettings,
  paymentNote,
  isValidEmail,
  type CartLine,
  type Order,
  type OrderItem,
  type Settings,
} from "@/lib/catalog";

const SETTINGS_KEY = "toolvault.settings.v1";
const CART_KEY = "toolvault.cart.v1";
const ORDERS_KEY = "toolvault.orders.v1";

type ShopContextValue = {
  ready: boolean;
  settings: Settings;
  cart: CartLine[];
  orders: Order[];
  addToCart: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  updateSettings: (next: Settings) => void;
  resetSettings: () => void;
  placeOrder: (buyer: { name: string; email: string }) => Order | null;
  updateOrderEmail: (orderId: string, email: string) => string | null;
  findOrder: (orderId: string) => Order | undefined;
};

const ShopContext = createContext<ShopContextValue | null>(null);

function readStored<T>(key: string, parse: (raw: unknown) => T, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return parse(JSON.parse(raw) as unknown);
  } catch {
    return fallback;
  }
}

function writeStored(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Private mode or a full disk: keep the in-memory shop for this visit.
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSettings(readStored(SETTINGS_KEY, parseSettings, DEFAULT_SETTINGS));
    setCart(readStored(CART_KEY, parseCart, []));
    setOrders(readStored(ORDERS_KEY, parseOrders, []));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    writeStored(SETTINGS_KEY, settings);
  }, [ready, settings]);

  useEffect(() => {
    if (!ready) return;
    writeStored(CART_KEY, cart);
  }, [ready, cart]);

  useEffect(() => {
    if (!ready) return;
    writeStored(ORDERS_KEY, orders);
  }, [ready, orders]);

  const value: ShopContextValue = {
    ready,
    settings,
    cart,
    orders,
    addToCart: (productId) => {
      if (!settings.products.some((product) => product.id === productId)) return;
      setCart((prev) => {
        const found = prev.find((line) => line.productId === productId);
        if (!found) return [...prev, { productId, qty: 1 }];
        if (found.qty >= 9) return prev;
        return prev.map((line) =>
          line.productId === productId ? { ...line, qty: line.qty + 1 } : line,
        );
      });
    },
    setQty: (productId, qty) => {
      setCart((prev) => {
        if (qty <= 0) return prev.filter((line) => line.productId !== productId);
        const nextQty = Math.min(9, qty);
        if (!prev.some((line) => line.productId === productId)) {
          return [...prev, { productId, qty: nextQty }];
        }
        return prev.map((line) =>
          line.productId === productId ? { ...line, qty: nextQty } : line,
        );
      });
    },
    removeFromCart: (productId) => {
      setCart((prev) => prev.filter((line) => line.productId !== productId));
    },
    clearCart: () => setCart([]),
    updateSettings: (next) => setSettings(parseSettings(next)),
    resetSettings: () => {
      setSettings(DEFAULT_SETTINGS);
      setCart([]);
    },
    placeOrder: (buyer) => {
      const name = buyer.name
        .replace(/[\u0000-\u001F\u007F]/g, "")
        .trim()
        .replace(/\s+/g, " ")
        .slice(0, 60);
      const email = buyer.email.trim().replace(/\s+/g, "");
      if (name.length < 2 || !isValidEmail(email)) return null;
      const items: OrderItem[] = [];
      for (const line of cart) {
        const product = settings.products.find((item) => item.id === line.productId);
        if (!product) continue;
        items.push({
          id: product.id,
          name: product.name,
          priceCents: product.priceCents,
          qty: line.qty,
        });
      }
      if (!items.length) return null;
      const id = makeOrderId(orders.map((order) => order.id));
      const order: Order = {
        id,
        name,
        email,
        items,
        totalCents: items.reduce((sum, item) => sum + item.priceCents * item.qty, 0),
        cashAppTag: settings.cashAppTag,
        note: paymentNote(id, email),
        createdAt: new Date().toISOString(),
      };
      const nextOrders = [order, ...orders].slice(0, 50);
      writeStored(ORDERS_KEY, nextOrders);
      writeStored(CART_KEY, []);
      setOrders(nextOrders);
      setCart([]);
      return order;
    },
    updateOrderEmail: (orderId, email) => {
      const nextEmail = email.trim().replace(/\s+/g, "");
      if (!isValidEmail(nextEmail)) return "Enter a valid email.";
      if (!orders.some((order) => order.id === orderId)) return "That order is not on this device.";
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? { ...order, email: nextEmail, note: paymentNote(order.id, nextEmail) }
            : order,
        ),
      );
      return null;
    },
    findOrder: (orderId) => orders.find((order) => order.id === orderId),
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const value = useContext(ShopContext);
  if (!value) throw new Error("Shop is unavailable.");
  return value;
}

export function useCartDetails() {
  const { cart, settings } = useShop();
  const lines = cart.flatMap((line) => {
    const product = settings.products.find((item) => item.id === line.productId);
    if (!product) return [];
    return [{ ...line, product, lineCents: product.priceCents * line.qty }];
  });
  const count = lines.reduce((sum, line) => sum + line.qty, 0);
  const totalCents = lines.reduce((sum, line) => sum + line.lineCents, 0);
  return { lines, count, totalCents };
}

export function usePageTitle(page?: string) {
  const { settings, ready } = useShop();
  useEffect(() => {
    const name = ready ? settings.name : "ToolVault";
    document.title = page ? `${page} · ${name}` : name;
  }, [page, ready, settings.name]);
}
