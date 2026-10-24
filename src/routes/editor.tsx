import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  DEFAULT_SETTINGS,
  ICON_KEYS,
  centsToInput,
  dollarsToCents,
  normalizeCashTag,
  normalizeHandle,
  cashAppUrl,
  tiktokUrl,
  type IconKey,
  type Product,
  type Settings,
} from "@/lib/catalog";
import { ICON_LABELS, ProductIcon } from "@/components/icons";
import { Button, buttonClass, fieldClass } from "@/components/ui";
import { usePageTitle, useShop } from "@/lib/shop";

export const Route = createFileRoute("/editor")({
  component: EditorPage,
});

type ProductDraft = {
  id: string;
  name: string;
  price: string;
  description: string;
  badge: string;
  icon: IconKey;
};

type Draft = {
  name: string;
  tagline: string;
  cashAppTag: string;
  tiktokHandle: string;
  products: ProductDraft[];
};

type EditorErrors = {
  name?: string;
  tagline?: string;
  cashAppTag?: string;
  tiktokHandle?: string;
  products: Record<string, string>;
};

const emptyErrors = (): EditorErrors => ({ products: {} });

function toDraft(settings: Settings): Draft {
  return {
    name: settings.name,
    tagline: settings.tagline,
    cashAppTag: settings.cashAppTag,
    tiktokHandle: settings.tiktokHandle,
    products: settings.products.map((product) => ({
      id: product.id,
      name: product.name,
      price: centsToInput(product.priceCents),
      description: product.description,
      badge: product.badge,
      icon: product.icon,
    })),
  };
}

function commitDraft(draft: Draft): { settings?: Settings; errors: EditorErrors } {
  const errors = emptyErrors();
  const name = draft.name.trim();
  const tagline = draft.tagline.trim();
  const cashAppTag = normalizeCashTag(draft.cashAppTag);
  const tiktokHandle = normalizeHandle(draft.tiktokHandle);
  if (!name) errors.name = "Add a store name.";
  else if (name.length > 40) errors.name = "Keep the name under 40 characters.";
  if (!tagline) errors.tagline = "Add a tagline.";
  else if (tagline.length > 160) errors.tagline = "Keep the tagline under 160 characters.";
  if (!cashAppTag) errors.cashAppTag = "Use letters and numbers only, up to 20.";
  if (tiktokHandle.length < 2) errors.tiktokHandle = "Enter the handle without the @.";

  const products: Product[] = [];
  const seen = new Set<string>();
  draft.products.forEach((product, index) => {
    const productName = product.name.replace(/\s+/g, " ").trim();
    const cents = dollarsToCents(product.price);
    if (!productName) {
      errors.products[product.id] = "Name this tool.";
      return;
    }
    if (cents === null) {
      errors.products[product.id] = "Enter a price like 24.99.";
      return;
    }
    let id = product.id;
    if (!/^[a-zA-Z0-9_-]{1,40}$/.test(id) || seen.has(id)) {
      id = `tool-${index}`.slice(0, 40);
    }
    seen.add(id);
    products.push({
      id,
      name: productName.slice(0, 80),
      priceCents: cents,
      description: product.description.trim().slice(0, 280),
      badge: product.badge.replace(/\s+/g, " ").trim().slice(0, 24),
      icon: product.icon,
    });
  });

  if (errors.name || errors.tagline || errors.cashAppTag || errors.tiktokHandle) {
    return { errors };
  }
  if (Object.keys(errors.products).length) return { errors };
  return {
    errors,
    settings: {
      name: name.slice(0, 40),
      tagline: tagline.slice(0, 160),
      cashAppTag,
      tiktokHandle,
      products,
    },
  };
}

function focusInvalid() {
  window.setTimeout(() => {
    document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
  }, 0);
}

function EditorPage() {
  const navigate = useNavigate();
  const { ready, settings, updateSettings, resetSettings } = useShop();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [errors, setErrors] = useState<EditorErrors>(emptyErrors());
  const [saved, setSaved] = useState(false);
  const [resetting, setResetting] = useState(false);
  usePageTitle("Editor");

  const booted = useRef(false);

  useEffect(() => {
    if (!ready || booted.current) return;
    booted.current = true;
    setDraft(toDraft(settings));
  }, [ready, settings]);

  useEffect(() => {
    if (!saved) return;
    const timer = window.setTimeout(() => setSaved(false), 2400);
    return () => window.clearTimeout(timer);
  }, [saved]);

  if (!ready || !draft) {
    return (
      <main id="content" className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight">Website editor</h1>
        <p className="mt-3 text-sm text-muted">Loading your shop…</p>
      </main>
    );
  }

  const dirty = JSON.stringify(draft) !== JSON.stringify(toDraft(settings));
  const tagPreview = normalizeCashTag(draft.cashAppTag);
  const handlePreview = normalizeHandle(draft.tiktokHandle);

  function apply(next: Draft) {
    setDraft(next);
    setSaved(false);
  }

  function persist(nextDraft: Draft): Settings | null {
    const result = commitDraft(nextDraft);
    setErrors(result.errors);
    if (!result.settings) {
      focusInvalid();
      return null;
    }
    updateSettings(result.settings);
    setDraft(toDraft(result.settings));
    setSaved(true);
    return result.settings;
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    persist(draft!);
  }

  function onView(event: MouseEvent<HTMLAnchorElement>) {
    if (!dirty) return;
    event.preventDefault();
    if (!persist(draft!)) return;
    void navigate({ to: "/" });
  }

  return (
    <main id="content" className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Website editor</h1>
      <p className="mt-3 max-w-xl text-sm leading-normal text-muted">
        Change the shop, save, then view it. This stays on the device, so the site works as soon
        as you publish it. New visitors see the built-in ToolVault catalog.
      </p>

      <form className="mt-8 grid gap-8" onSubmit={onSubmit} noValidate>
        <Actions saved={saved} dirty={dirty} onView={onView} />

        <section className="grid gap-4" aria-labelledby="shop-fields">
          <h2 id="shop-fields" className="text-lg font-semibold">
            Shop
          </h2>
          <label className="grid gap-2">
            <span className="text-sm font-medium">Store name</span>
            <input
              value={draft.name}
              maxLength={40}
              autoComplete="off"
              aria-invalid={Boolean(errors.name)}
              onChange={(event) => apply({ ...draft, name: event.target.value })}
              className={`${fieldClass} h-11`}
            />
            {errors.name ? <FieldError>{errors.name}</FieldError> : null}
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium">Tagline</span>
            <input
              value={draft.tagline}
              maxLength={160}
              autoComplete="off"
              aria-invalid={Boolean(errors.tagline)}
              onChange={(event) => apply({ ...draft, tagline: event.target.value })}
              className={`${fieldClass} h-11`}
            />
            {errors.tagline ? <FieldError>{errors.tagline}</FieldError> : null}
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium">Cash App tag</span>
            <span className="relative block">
              <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted">
                $
              </span>
              <input
                value={draft.cashAppTag}
                maxLength={20}
                autoComplete="off"
                spellCheck={false}
                aria-invalid={Boolean(errors.cashAppTag)}
                onChange={(event) => apply({ ...draft, cashAppTag: event.target.value })}
                className={`${fieldClass} h-11 pl-7`}
              />
            </span>
            {errors.cashAppTag ? (
              <FieldError>{errors.cashAppTag}</FieldError>
            ) : tagPreview ? (
              <a
                href={cashAppUrl(tagPreview)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cash hover:underline"
              >
                Test cash.app/${tagPreview}
              </a>
            ) : (
              <span className="text-sm text-faint">Letters and numbers only.</span>
            )}
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium">TikTok handle</span>
            <span className="relative block">
              <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted">
                @
              </span>
              <input
                value={draft.tiktokHandle}
                maxLength={24}
                autoComplete="off"
                spellCheck={false}
                aria-invalid={Boolean(errors.tiktokHandle)}
                onChange={(event) => apply({ ...draft, tiktokHandle: event.target.value })}
                className={`${fieldClass} h-11 pl-7`}
              />
            </span>
            {errors.tiktokHandle ? (
              <FieldError>{errors.tiktokHandle}</FieldError>
            ) : handlePreview ? (
              <a
                href={tiktokUrl(handlePreview)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cash hover:underline"
              >
                Test tiktok.com/@{handlePreview}
              </a>
            ) : null}
          </label>
        </section>

        <section className="grid gap-4" aria-labelledby="product-fields">
          <div className="flex items-center justify-between gap-3">
            <h2 id="product-fields" className="text-lg font-semibold">
              Tools
            </h2>
            <Button
              type="button"
              variant="secondary"
              disabled={draft.products.length >= 30}
              onClick={() => {
                const id = `tool-${Math.random().toString(36).slice(2, 8)}`;
                apply({
                  ...draft,
                  products: [
                    ...draft.products,
                    {
                      id,
                      name: "",
                      price: "9.99",
                      description: "",
                      badge: "",
                      icon: "wrench",
                    },
                  ],
                });
                window.setTimeout(() => {
                  document.getElementById(`product-${id}`)?.scrollIntoView({ block: "center" });
                }, 50);
              }}
            >
              Add tool
            </Button>
          </div>
          {draft.products.length === 0 ? (
            <p className="text-sm text-muted">The shop is empty until you add a tool.</p>
          ) : null}
          {draft.products.map((product) => {
            const productError = errors.products[product.id];
            return (
              <article
                key={product.id}
                id={`product-${product.id}`}
                className="grid gap-4 rounded-card border border-line bg-surface p-4"
              >
                <div className="grid gap-2">
                  <span className="text-sm font-medium" id={`icon-label-${product.id}`}>
                    Icon
                  </span>
                  <div
                    role="group"
                    aria-labelledby={`icon-label-${product.id}`}
                    className="flex flex-wrap gap-2"
                  >
                    {ICON_KEYS.map((key) => {
                      const selected = product.icon === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          aria-pressed={selected}
                          aria-label={ICON_LABELS[key]}
                          onClick={() =>
                            apply({
                              ...draft,
                              products: draft.products.map((item) =>
                                item.id === product.id ? { ...item, icon: key } : item,
                              ),
                            })
                          }
                          className={`inline-flex size-11 items-center justify-center rounded-control border transition-colors duration-150 ${
                            selected
                              ? "border-cash bg-background text-foreground"
                              : "border-line bg-background text-muted hover:text-foreground"
                          }`}
                        >
                          <ProductIcon name={key} className="size-5" />
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-medium">Name</span>
                    <input
                      value={product.name}
                      maxLength={80}
                      autoComplete="off"
                      aria-invalid={productError === "Name this tool."}
                      onChange={(event) =>
                        apply({
                          ...draft,
                          products: draft.products.map((item) =>
                            item.id === product.id ? { ...item, name: event.target.value } : item,
                          ),
                        })
                      }
                      className={`${fieldClass} h-11`}
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-medium">Price</span>
                    <span className="relative block">
                      <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted">
                        $
                      </span>
                      <input
                        value={product.price}
                        inputMode="decimal"
                        autoComplete="off"
                        aria-invalid={productError === "Enter a price like 24.99."}
                        onChange={(event) =>
                          apply({
                            ...draft,
                            products: draft.products.map((item) =>
                              item.id === product.id ? { ...item, price: event.target.value } : item,
                            ),
                          })
                        }
                        className={`${fieldClass} h-11 pl-7`}
                      />
                    </span>
                  </label>
                </div>
                <label className="grid gap-2">
                  <span className="text-sm font-medium">Badge</span>
                  <input
                    value={product.badge}
                    maxLength={24}
                    autoComplete="off"
                    onChange={(event) =>
                      apply({
                        ...draft,
                        products: draft.products.map((item) =>
                          item.id === product.id ? { ...item, badge: event.target.value } : item,
                        ),
                      })
                    }
                    className={`${fieldClass} h-11`}
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-medium">Description</span>
                  <textarea
                    value={product.description}
                    maxLength={280}
                    rows={3}
                    onChange={(event) =>
                      apply({
                        ...draft,
                        products: draft.products.map((item) =>
                          item.id === product.id
                            ? { ...item, description: event.target.value }
                            : item,
                        ),
                      })
                    }
                    className={`${fieldClass} min-h-24 py-3`}
                  />
                </label>
                {productError ? <FieldError>{productError}</FieldError> : null}
                <div>
                  <button
                    type="button"
                    className="inline-flex h-11 items-center text-sm font-medium text-danger"
                    onClick={() =>
                      apply({
                        ...draft,
                        products: draft.products.filter((item) => item.id !== product.id),
                      })
                    }
                  >
                    Remove tool
                  </button>
                </div>
              </article>
            );
          })}
        </section>

        <section className="rounded-card border border-line p-4">
          {resetting ? (
            <div className="grid gap-3">
              <p className="text-sm leading-normal text-muted">
                Replace your edits with the original ToolVault catalog, Cash App tag, and TikTok
                handle? This only affects this browser.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  onClick={() => {
                    resetSettings();
                    setDraft(toDraft(DEFAULT_SETTINGS));
                    setErrors(emptyErrors());
                    setResetting(false);
                    setSaved(true);
                  }}
                >
                  Reset shop
                </Button>
                <Button type="button" variant="secondary" onClick={() => setResetting(false)}>
                  Keep edits
                </Button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              className="inline-flex h-11 items-center text-sm font-medium text-muted hover:text-foreground"
              onClick={() => setResetting(true)}
            >
              Reset to original shop
            </button>
          )}
        </section>

        <Actions saved={saved} dirty={dirty} onView={onView} />
      </form>
    </main>
  );
}

function Actions({
  saved,
  dirty,
  onView,
}: {
  saved: boolean;
  dirty: boolean;
  onView: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button type="submit">Save</Button>
      <Link to="/" onClick={onView} className={buttonClass({ variant: "secondary" })}>
        View shop
      </Link>
      <p className="text-sm text-muted" role="status">
        {saved ? "Saved on this device." : dirty ? "Unsaved changes" : "Up to date"}
      </p>
    </div>
  );
}

function FieldError({ children }: { children: string }) {
  return (
    <span className="text-sm text-danger" role="alert">
      {children}
    </span>
  );
}
