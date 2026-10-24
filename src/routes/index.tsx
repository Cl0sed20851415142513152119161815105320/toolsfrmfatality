import { createFileRoute, Link } from "@tanstack/react-router";
import { displayCashTag } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { buttonClass } from "@/components/ui";
import { usePageTitle, useShop } from "@/lib/shop";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { settings } = useShop();
  usePageTitle();
  const tag = displayCashTag(settings.cashAppTag);
  const steps = [
    {
      title: "Add a tool",
      body: "Pick what you need. The cart stays on this device until you check out.",
    },
    {
      title: "Leave name and email",
      body: "No account and no card number. The email is where the tool is delivered.",
    },
    {
      title: "Pay on Cash App",
      body: `Send the exact total to ${tag} and put your order ID in the note.`,
    },
  ];

  return (
    <main id="content" className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <p className="text-sm font-medium text-cash">{tag}</p>
      <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
        {settings.name}
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted">{settings.tagline}</p>
      <p className="mt-3 max-w-xl text-sm text-foreground">
        Card numbers are never collected. Digital tools are emailed after the Cash App payment
        shows your order ID.
      </p>

      <section className="mt-10" aria-labelledby="tools-heading">
        <div className="mb-4 flex items-baseline justify-between gap-3">
          <h2 id="tools-heading" className="text-lg font-semibold">
            Tools
          </h2>
          <p className="text-sm tabular-nums text-muted">{settings.products.length}</p>
        </div>
        {settings.products.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {settings.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-card border border-line bg-surface p-4">
            <p className="text-sm text-muted">Nothing in the vault yet.</p>
            <Link to="/editor" className={`${buttonClass({ variant: "secondary" })} mt-4`}>
              Add a tool
            </Link>
          </div>
        )}
      </section>

      <section className="mt-14" aria-labelledby="pay-heading">
        <h2 id="pay-heading" className="text-lg font-semibold">
          How to pay
        </h2>
        <ol className="mt-4 grid gap-4 sm:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-card border border-line bg-surface p-4">
              <span className="text-sm font-semibold tabular-nums text-cash">{index + 1}</span>
              <h3 className="mt-3 text-base font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-normal text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
