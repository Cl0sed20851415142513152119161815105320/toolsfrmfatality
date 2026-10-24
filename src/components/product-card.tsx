import { Minus, Plus } from "lucide-react";
import { formatMoney, type Product } from "@/lib/catalog";
import { ProductIcon } from "@/components/icons";
import { Button } from "@/components/ui";
import { useCartDetails, useShop } from "@/lib/shop";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, setQty } = useShop();
  const { lines } = useCartDetails();
  const line = lines.find((item) => item.product.id === product.id);

  return (
    <article className="flex h-full flex-col rounded-card border border-line bg-surface p-4">
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-11 items-center justify-center rounded-control bg-background text-foreground">
          <ProductIcon name={product.icon} className="size-5" />
        </span>
        {product.badge ? (
          <span className="pt-1 text-right text-xs font-medium text-muted">{product.badge}</span>
        ) : null}
      </div>
      <h3 className="mt-4 text-lg font-semibold tracking-tight">{product.name}</h3>
      <p className="mt-2 flex-1 whitespace-pre-wrap text-sm leading-normal text-muted">
        {product.description}
      </p>
      <div className="mt-5 border-t border-line pt-4">
        <p className="text-lg font-semibold tabular-nums">{formatMoney(product.priceCents)}</p>
        <div className="mt-3">
          {line ? (
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="icon"
                aria-label={line.qty === 1 ? `Remove ${product.name}` : `Decrease ${product.name}`}
                onClick={() => setQty(product.id, line.qty - 1)}
              >
                <Minus className="size-4" aria-hidden="true" />
              </Button>
              <span className="flex-1 text-center text-sm font-semibold tabular-nums" aria-live="polite">
                {line.qty} in cart
              </span>
              <Button
                variant="secondary"
                size="icon"
                aria-label={`Increase ${product.name}`}
                disabled={line.qty >= 9}
                onClick={() => setQty(product.id, line.qty + 1)}
              >
                <Plus className="size-4" aria-hidden="true" />
              </Button>
            </div>
          ) : (
            <Button className="w-full" onClick={() => addToCart(product.id)}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
