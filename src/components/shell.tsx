import { Link } from "@tanstack/react-router";
import { Pencil, ShoppingBag } from "lucide-react";
import { cashAppUrl, displayCashTag, tiktokUrl } from "@/lib/catalog";
import { useCartDetails, useShop } from "@/lib/shop";
import { TikTokIcon } from "@/components/icons";

function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" className="fill-cash" />
      <path
        fill="var(--color-ink)"
        d="M16 6.2a5.1 5.1 0 0 1 2.2 9.6L21 25.2h-10l2.8-9.4A5.1 5.1 0 0 1 16 6.2zm0 2.6a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8z"
      />
    </svg>
  );
}

export function Header() {
  const { settings } = useShop();
  const { count } = useCartDetails();
  const itemLabel = count === 1 ? "item" : "items";

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-background">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:inline-flex focus:h-11 focus:items-center focus:rounded-control focus:bg-cash focus:px-4 focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-2 px-4 sm:gap-3 sm:px-6">
        <Link to="/" className="flex min-w-0 flex-1 items-center gap-2">
          <Mark className="size-8 shrink-0" />
          <span className="truncate text-base font-semibold tracking-tight">{settings.name}</span>
        </Link>
        <div className="flex shrink-0 items-center">
          <Link
            to="/editor"
            aria-label="Website editor"
            className="inline-flex h-11 items-center justify-center rounded-control px-2 text-muted transition-colors duration-150 hover:bg-surface hover:text-foreground sm:px-3"
          >
            <Pencil className="size-5 sm:hidden" aria-hidden="true" />
            <span className="hidden text-sm font-medium sm:inline">Editor</span>
          </Link>
          <Link
            to="/cart"
            aria-label={`Cart, ${count} ${itemLabel}`}
            className="inline-flex h-11 items-center gap-1.5 rounded-control px-2 text-foreground transition-colors duration-150 hover:bg-surface sm:px-3"
          >
            <ShoppingBag className="size-5" strokeWidth={1.75} aria-hidden="true" />
            <span className="text-sm font-semibold tabular-nums">{count}</span>
          </Link>
          <a
            href={tiktokUrl(settings.tiktokHandle)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`TikTok @${settings.tiktokHandle}`}
            className="inline-flex size-11 items-center justify-center rounded-control text-foreground transition-colors duration-150 hover:bg-surface"
          >
            <TikTokIcon className="size-5" />
          </a>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  const { settings } = useShop();
  const tag = displayCashTag(settings.cashAppTag);

  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>Cash App only. Card numbers are never collected.</p>
        <div className="flex items-center gap-4">
          <Link to="/editor" className="font-medium text-foreground hover:text-cash">
            Website editor
          </Link>
          <a
            href={cashAppUrl(settings.cashAppTag)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold tabular-nums text-foreground hover:text-cash"
          >
            {tag}
          </a>
        </div>
      </div>
    </footer>
  );
}
