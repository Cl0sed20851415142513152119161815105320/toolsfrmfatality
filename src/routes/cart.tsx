import { useRef, useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { formatMoney, isValidEmail } from "@/lib/catalog";
import { ProductIcon } from "@/components/icons";
import { Button, fieldClass } from "@/components/ui";
import { useCartDetails, usePageTitle, useShop } from "@/lib/shop";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

function CartPage() {
  const navigate = useNavigate();
  const { setQty, removeFromCart, placeOrder } = useShop();
  const { lines, count, totalCents } = useCartDetails();
  usePageTitle("Cart");
  const submitting = useRef(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [formError, setFormError] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const nextName = name.trim();
    const nextEmail = email.trim();
    const nextNameError = nextName.length < 2 ? "Enter the name for this order." : "";
    const nextEmailError = isValidEmail(nextEmail)
      ? ""
      : "Enter a valid email. The tool is delivered there.";
    setNameError(nextNameError);
    setEmailError(nextEmailError);
    setFormError("");
    if (nextNameError || nextEmailError) return;
    submitting.current = true;
    const order = placeOrder({ name: nextName, email: nextEmail });
    if (!order) {
      submitting.current = false;
      setFormError("Your cart is empty.");
      return;
    }
    void navigate({
      to: "/order/$orderId",
      params: { orderId: order.id },
      replace: true,
    });
  }

  return (
    <main id="content" className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Cart</h1>
      {count === 0 ? (
        <div className="mt-8 max-w-md">
          <p className="text-muted">Your cart is empty.</p>
          <Link to="/" className={`${buttonLink()} mt-6`}>
            Browse tools
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <section aria-label="Items" className="rounded-card border border-line bg-surface p-4">
            <ul>
              {lines.map((line) => (
                <li
                  key={line.product.id}
                  className="flex gap-3 border-b border-line py-4 first:pt-0 last:border-b-0 last:pb-0"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-control bg-background">
                    <ProductIcon name={line.product.icon} className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-base font-semibold">{line.product.name}</h2>
                      <p className="shrink-0 text-sm font-semibold tabular-nums">
                        {formatMoney(line.lineCents)}
                      </p>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <Button
                        variant="secondary"
                        size="icon"
                        aria-label={
                          line.qty === 1 ? `Remove ${line.product.name}` : `Decrease ${line.product.name}`
                        }
                        onClick={() => setQty(line.product.id, line.qty - 1)}
                      >
                        <Minus className="size-4" aria-hidden="true" />
                      </Button>
                      <span className="w-8 text-center text-sm font-semibold tabular-nums">{line.qty}</span>
                      <Button
                        variant="secondary"
                        size="icon"
                        aria-label={`Increase ${line.product.name}`}
                        disabled={line.qty >= 9}
                        onClick={() => setQty(line.product.id, line.qty + 1)}
                      >
                        <Plus className="size-4" aria-hidden="true" />
                      </Button>
                      <button
                        type="button"
                        className="ml-auto inline-flex h-11 items-center px-2 text-sm font-medium text-muted hover:text-danger"
                        onClick={() => removeFromCart(line.product.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-card border border-line bg-surface p-4" aria-labelledby="checkout-heading">
            <h2 id="checkout-heading" className="text-lg font-semibold">
              Checkout
            </h2>
            <p className="mt-2 text-sm leading-normal text-muted">
              Name and email only. You will not enter a card number. Next, send{" "}
              <span className="font-semibold tabular-nums text-foreground">{formatMoney(totalCents)}</span>{" "}
              on Cash App with your order ID in the note.
            </p>
            <form className="mt-5 grid gap-4" onSubmit={onSubmit} noValidate>
              <label className="grid gap-2">
                <span className="text-sm font-medium">Name</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                  maxLength={60}
                  aria-invalid={Boolean(nameError)}
                  className={`${fieldClass} h-11`}
                />
                {nameError ? (
                  <span className="text-sm text-danger" role="alert">
                    {nameError}
                  </span>
                ) : null}
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium">Email</span>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  inputMode="email"
                  maxLength={80}
                  aria-invalid={Boolean(emailError)}
                  className={`${fieldClass} h-11`}
                />
                {emailError ? (
                  <span className="text-sm text-danger" role="alert">
                    {emailError}
                  </span>
                ) : (
                  <span className="text-sm text-faint">
                    Included in the Cash App note so the tool can be sent to you.
                  </span>
                )}
              </label>
              {formError ? (
                <p className="text-sm text-danger" role="alert">
                  {formError}
                </p>
              ) : null}
              <div className="flex items-center justify-between gap-3 border-t border-line pt-4">
                <span className="text-sm text-muted">Total</span>
                <span className="text-lg font-semibold tabular-nums">{formatMoney(totalCents)}</span>
              </div>
              <Button type="submit" className="w-full">
                Get order ID
              </Button>
              <p className="text-sm text-faint">No tax or shipping. Send this exact total.</p>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}

function buttonLink() {
  return "inline-flex min-h-11 items-center justify-center rounded-control bg-cash px-4 text-sm font-semibold text-ink hover:bg-cash-deep";
}
