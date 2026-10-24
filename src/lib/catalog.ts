export const ICON_KEYS = [
  "search",
  "key",
  "activity",
  "code",
  "bot",
  "calendar",
  "shield",
  "zap",
  "terminal",
  "chart",
  "globe",
  "gauge",
  "layers",
  "wrench",
] as const;

export type IconKey = (typeof ICON_KEYS)[number];

export type Product = {
  id: string;
  name: string;
  priceCents: number;
  description: string;
  badge: string;
  icon: IconKey;
};

export type Settings = {
  name: string;
  tagline: string;
  cashAppTag: string;
  tiktokHandle: string;
  products: Product[];
};

export type OrderItem = {
  id: string;
  name: string;
  priceCents: number;
  qty: number;
};

export type Order = {
  id: string;
  name: string;
  email: string;
  items: OrderItem[];
  totalCents: number;
  cashAppTag: string;
  note: string;
  createdAt: string;
};

export type CartLine = {
  productId: string;
  qty: number;
};

export const DEFAULT_SETTINGS: Settings = {
  name: "ToolVault",
  tagline: "Premium digital tools. Pay with Cash App and nothing else.",
  cashAppTag: "josephdaniel20",
  tiktokHandle: "iifatality",
  products: [
    {
      id: "seo",
      name: "SEO Analyzer Pro",
      priceCents: 2499,
      description:
        "Check titles, meta descriptions, headings, and indexability. You get a prioritized fix list, not a 40-page dump.",
      badge: "Best seller",
      icon: "search",
    },
    {
      id: "passwords",
      name: "Password Vault Generator",
      priceCents: 999,
      description:
        "Create long unique passwords and store them in an encrypted file that stays on your machine.",
      badge: "Starter",
      icon: "key",
    },
    {
      id: "uptime",
      name: "Uptime Monitor Toolkit",
      priceCents: 1999,
      description:
        "Watch URLs on a timer, record response time, and publish a plain status page for clients.",
      badge: "Ops",
      icon: "activity",
    },
    {
      id: "snippets",
      name: "Code Snippet Manager",
      priceCents: 1499,
      description: "Keep the snippets you reuse, tagged and searchable, with one-click copy.",
      badge: "Dev",
      icon: "code",
    },
    {
      id: "prompts",
      name: "AI Prompt Engineering Pack",
      priceCents: 1799,
      description:
        "Fill-in prompt briefs for research, editing, and code review. Patterns you can reuse, not a quote list.",
      badge: "New",
      icon: "bot",
    },
    {
      id: "scheduler",
      name: "Social Media Scheduler",
      priceCents: 2299,
      description:
        "Plan a week of posts, assign times, and export a calendar you can follow without a team tool.",
      badge: "Growth",
      icon: "calendar",
    },
  ],
};

const ICON_SET = new Set<string>(ICON_KEYS);

export function isIconKey(value: string): value is IconKey {
  return ICON_SET.has(value);
}

export function formatMoney(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function centsToInput(cents: number): string {
  return (cents / 100).toFixed(2);
}

export function dollarsToCents(value: string): number | null {
  const cleaned = value.trim().replace(/^\$/, "");
  if (!/^\d{1,4}(\.\d{1,2})?$/.test(cleaned)) return null;
  const [dollars, fraction = ""] = cleaned.split(".");
  const cents = Number(dollars) * 100 + Number(fraction.padEnd(2, "0"));
  if (!Number.isInteger(cents) || cents > 999999) return null;
  return cents;
}

export function normalizeCashTag(input: string): string {
  return input
    .trim()
    .replace(/^\$+/, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 20);
}

export function normalizeHandle(input: string): string {
  return input
    .trim()
    .replace(/^@+/, "")
    .replace(/[^a-zA-Z0-9._]/g, "")
    .slice(0, 24);
}

export function cashAppUrl(tag: string): string {
  const clean = normalizeCashTag(tag) || DEFAULT_SETTINGS.cashAppTag;
  return `https://cash.app/$${clean}`;
}

export function displayCashTag(tag: string): string {
  return `$${normalizeCashTag(tag) || DEFAULT_SETTINGS.cashAppTag}`;
}

export function tiktokUrl(handle: string): string {
  const clean = normalizeHandle(handle) || DEFAULT_SETTINGS.tiktokHandle;
  return `https://www.tiktok.com/@${clean}`;
}

export function cleanText(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, max);
}

export function cleanMultiline(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);
}

function parseProduct(raw: unknown): Product | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Partial<Product>;
  const name = cleanText(o.name, 80);
  const priceCents = o.priceCents;
  if (!name) return null;
  if (typeof priceCents !== "number" || !Number.isInteger(priceCents)) return null;
  if (priceCents < 0 || priceCents > 999999) return null;
  const id =
    typeof o.id === "string" && /^[a-zA-Z0-9_-]{1,40}$/.test(o.id) ? o.id : `tool-${name.length}`;
  return {
    id,
    name,
    priceCents,
    description: cleanMultiline(o.description, 280),
    badge: cleanText(o.badge, 24),
    icon: typeof o.icon === "string" && isIconKey(o.icon) ? o.icon : "wrench",
  };
}

export function parseSettings(raw: unknown): Settings {
  if (!raw || typeof raw !== "object") return DEFAULT_SETTINGS;
  const o = raw as Partial<Settings>;
  const name = cleanText(o.name, 40);
  const tagline = cleanText(o.tagline, 160);
  const cashAppTag = normalizeCashTag(typeof o.cashAppTag === "string" ? o.cashAppTag : "");
  const tiktokHandle = normalizeHandle(typeof o.tiktokHandle === "string" ? o.tiktokHandle : "");
  const products = Array.isArray(o.products)
    ? o.products.flatMap((item) => {
        const product = parseProduct(item);
        return product ? [product] : [];
      })
    : DEFAULT_SETTINGS.products;

  const seen = new Set<string>();
  const unique = products.map((product, index) => {
    let id = product.id;
    if (seen.has(id)) id = `${id}-${index}`.slice(0, 40);
    seen.add(id);
    return { ...product, id };
  });

  return {
    name: name || DEFAULT_SETTINGS.name,
    tagline: tagline || DEFAULT_SETTINGS.tagline,
    cashAppTag: cashAppTag || DEFAULT_SETTINGS.cashAppTag,
    tiktokHandle: tiktokHandle || DEFAULT_SETTINGS.tiktokHandle,
    products: unique.slice(0, 30),
  };
}

export function parseCart(raw: unknown): CartLine[] {
  if (!Array.isArray(raw)) return [];
  const lines: CartLine[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const line = item as Partial<CartLine>;
    if (typeof line.productId !== "string" || !/^[a-zA-Z0-9_-]{1,40}$/.test(line.productId)) continue;
    if (!Number.isInteger(line.qty) || (line.qty ?? 0) < 1 || (line.qty ?? 0) > 9) continue;
    if (lines.some((existing) => existing.productId === line.productId)) continue;
    lines.push({ productId: line.productId, qty: line.qty as number });
  }
  return lines.slice(0, 30);
}

function parseOrder(raw: unknown): Order | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Partial<Order>;
  if (typeof o.id !== "string" || !/^TV-[A-Z2-9]{6,12}$/.test(o.id)) return null;
  if (typeof o.email !== "string" || typeof o.name !== "string") return null;
  if (!Array.isArray(o.items) || typeof o.totalCents !== "number") return null;
  const items: OrderItem[] = [];
  for (const item of o.items) {
    if (!item || typeof item !== "object") return null;
    const row = item as Partial<OrderItem>;
    if (typeof row.id !== "string" || typeof row.name !== "string") return null;
    if (!Number.isInteger(row.priceCents) || !Number.isInteger(row.qty)) return null;
    if ((row.qty ?? 0) < 1 || (row.priceCents ?? 0) < 0) return null;
    items.push({
      id: row.id,
      name: cleanText(row.name, 80),
      priceCents: row.priceCents as number,
      qty: row.qty as number,
    });
  }
  if (!items.length) return null;
  return {
    id: o.id,
    name: cleanText(o.name, 60),
    email: o.email.trim().slice(0, 80),
    items,
    totalCents: o.totalCents,
    cashAppTag: normalizeCashTag(typeof o.cashAppTag === "string" ? o.cashAppTag : "") || DEFAULT_SETTINGS.cashAppTag,
    note: cleanText(o.note, 120),
    createdAt: typeof o.createdAt === "string" ? o.createdAt : new Date(0).toISOString(),
  };
}

export function parseOrders(raw: unknown): Order[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item) => {
    const order = parseOrder(item);
    return order ? [order] : [];
  }).slice(0, 50);
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 80;
}

export function paymentNote(orderId: string, email: string): string {
  return `${orderId} ${email.trim()}`;
}

const ORDER_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function makeOrderId(existing: string[]): string {
  const taken = new Set(existing);
  for (let attempt = 0; attempt < 8; attempt += 1) {
    let id = "TV-";
    const bytes = new Uint32Array(6);
    if (typeof crypto !== "undefined" && crypto.getRandomValues) {
      crypto.getRandomValues(bytes);
      for (let i = 0; i < bytes.length; i += 1) id += ORDER_ALPHABET[bytes[i] % ORDER_ALPHABET.length];
    } else {
      for (let i = 0; i < 6; i += 1) {
        id += ORDER_ALPHABET[Math.floor(Math.random() * ORDER_ALPHABET.length)];
      }
    }
    if (!taken.has(id)) return id;
  }
  let extra = "TV-";
  for (let i = 0; i < 8; i += 1) {
    extra += ORDER_ALPHABET[Math.floor(Math.random() * ORDER_ALPHABET.length)];
  }
  return extra;
}
