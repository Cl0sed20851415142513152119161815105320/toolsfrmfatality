import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { cashAppUrl, displayCashTag, formatMoney, isValidEmail } from "@/lib/catalog";
import { buttonClass, fieldClass } from "@/components/ui";
import { usePageTitle, useShop } from "@/lib/shop";

export const Route = createFileRoute("/order/$orderId")({
  component: OrderPage,
});

function OrderPage() {
  const { orderId } = Route.useParams();
  const { ready, settings, findOrder, updateOrderEmail } = useShop();
  const order = findOrder(orderId);
  usePageTitle("Pay");
  const [copied, setCopied] = useState<"idle" | "copied" | "manual">("idle");
  const [editing, setEditing] = useState(false);
  const [email, setEmail] = useState(order?.email ?? "");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (order) setEmail(order.email);
  }, [order]);

  async function copyNote() {
    if (!order) return;
    try {
      await navigator.clipboard.writeText(order.note);
      setCopied("copied");
    } catch {
      setCopied("manual");
    }
    window.setTimeout(() => setCopied("idle"), 2000);
  }

  function saveEmail() {
    if (!order) return;
    if (!isValidEmail(email.trim())) {
      setEmailError("Enter a valid email.");
      return;
    }
    const error = updateOrderEmail(order.id, email);
    if (error) {
      setEmailError(error);
      return;
    }
    setEmailError("");
    setEditing(false);
  }

  if (!ready) {
    return (
      <main id="content" className="mx-auto w-full max-w-xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight">Pay with Cash App</h1>
        <p className="mt-3 text-sm text-muted">Loading order {orderId}…</p>
      </main>
    );
  }

  if (!order) {
    return (
      <main id="content" className="mx-auto w-full max-w-xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight">Order {orderId}</h1>
        <p className="mt-3 text-sm leading-normal text-muted">
          This receipt lives on the device that checked out. You can still send the payment and
          put {orderId} in the Cash App note.
        </p>
        <a
          href={cashAppUrl(settings.cashAppTag)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonClass()} mt-6 w-full`}
        >
          Open Cash App
        </a>
        <Link to="/" className="mt-4 inline-flex h-11 items-center text-sm font-medium text-muted">
          Back to the shop
        </Link>
      </main>
    );
  }

  const tag = displayCashTag(order.cashAppTag);
  const when = formatWhen(order.createdAt);

  return (
    <main id="content" className="mx-auto w-full max-w-xl px-4 py-8 sm:px-6 sm:py-12">
      <p className="text-sm font-medium text-cash">Cash App only</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Send this payment</h1>
      <p className="mt-3 text-sm leading-normal text-muted">
        You are not charged on this page. Send the exact total, and paste the note so the order
        can be matched to your email.
      </p>

      <section className="mt-8 rounded-card border border-line bg-surface p-4">
        <p className="text-sm text-muted">Order ID</p>
        <p className="mt-1 font-mono text-2xl font-semibold tracking-wide">{order.id}</p>
        {when ? <p className="mt-2 text-sm text-faint">{when}</p> : null}
        <p className="mt-6 text-sm text-muted">Send exactly</p>
        <p className="mt-1 text-4xl font-semibold tabular-nums tracking-tight">
          {formatMoney(order.totalCents)}
        </p>
        <p className="mt-2 text-sm text-muted">
          to <span className="font-semibold text-foreground">{tag}</span>
        </p>

        <ol className="mt-6 grid gap-3 text-sm leading-normal">
          <li className="flex gap-3">
            <span className="font-semibold tabular-nums text-cash">1</span>
            <span>Open Cash App with the button below.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold tabular-nums text-cash">2</span>
            <span>
              Send exactly {formatMoney(order.totalCents)} to {tag}. Do not round it.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold tabular-nums text-cash">3</span>
            <span>Paste the note. It has your order ID and email.</span>
          </li>
        </ol>

        <label className="mt-6 grid gap-2">
          <span className="text-sm font-medium">Cash App note</span>
          <input
            readOnly
            value={order.note}
            aria-label="Cash App note"
            onFocus={(event) => event.currentTarget.select()}
            className={`${fieldClass} h-11 font-mono text-sm`}
          />
        </label>

        <div className="mt-4 grid gap-2">
          <a
            href={cashAppUrl(order.cashAppTag)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass({ size: "full" })}
          >
            Pay {formatMoney(order.totalCents)} on Cash App
          </a>
          <button type="button" onClick={() => void copyNote()} className={buttonClass({ variant: "secondary", size: "full" })}>
            {copied === "copied" ? "Note copied" : "Copy note"}
          </button>
        </div>
        {copied === "manual" ? (
          <p className="mt-2 text-sm text-muted" role="status">
            Select the note and copy it.
          </p>
        ) : null}
        <p className="mt-4 text-sm text-faint">Card numbers are never collected.</p>
      </section>

      <section className="mt-4 rounded-card border border-line p-4">
        <h2 className="text-sm font-semibold">Buyer</h2>
        <p className="mt-2 text-sm">{order.name}</p>
        <p className="text-sm break-all text-muted">{order.email}</p>
        {editing ? (
          <div className="mt-4 grid gap-2">
            <label className="grid gap-2">
              <span className="text-sm font-medium">Fix email</span>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                inputMode="email"
                autoComplete="email"
                maxLength={80}
                aria-invalid={Boolean(emailError)}
                className={`${fieldClass} h-11`}
              />
            </label>
            {emailError ? (
              <p className="text-sm text-danger" role="alert">
                {emailError}
              </p>
            ) : (
              <p className="text-sm text-faint">Do this before you pay. It updates the note.</p>
            )}
            <div className="flex gap-2">
              <button type="button" className={buttonClass()} onClick={saveEmail}>
                Update note
              </button>
              <button
                type="button"
                className={buttonClass({ variant: "ghost" })}
                onClick={() => {
                  setEditing(false);
                  setEmail(order.email);
                  setEmailError("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="mt-3 inline-flex h-11 items-center text-sm font-medium text-muted hover:text-foreground"
            onClick={() => setEditing(true)}
          >
            Fix email
          </button>
        )}
      </section>

      <section className="mt-4" aria-label="Items">
        <ul>
          {order.items.map((item) => (
            <li key={item.id} className="flex items-start justify-between gap-4 border-t border-line py-3 text-sm">
              <span className="min-w-0">
                <span className="block font-medium">{item.name}</span>
                <span className="text-muted">Qty {item.qty}</span>
              </span>
              <span className="shrink-0 tabular-nums">{formatMoney(item.priceCents * item.qty)}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

function formatWhen(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
