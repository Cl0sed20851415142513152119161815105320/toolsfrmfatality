import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Plus, u as Minus } from "../_libs/lucide-react.mjs";
import { a as useCartDetails, f as displayCashTag, i as ProductIcon, m as formatMoney, o as usePageTitle, s as useShop } from "./router-CQ7bANBs.mjs";
import { n as buttonClass, t as Button } from "./ui-S8JtiB-r.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DQIHAKBv.js
var import_jsx_runtime = require_jsx_runtime();
function ProductCard({ product }) {
	const { addToCart, setQty } = useShop();
	const { lines } = useCartDetails();
	const line = lines.find((item) => item.product.id === product.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "flex h-full flex-col rounded-card border border-line bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-11 items-center justify-center rounded-control bg-background text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductIcon, {
						name: product.icon,
						className: "size-5"
					})
				}), product.badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "pt-1 text-right text-xs font-medium text-muted",
					children: product.badge
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-4 text-lg font-semibold tracking-tight",
				children: product.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 flex-1 whitespace-pre-wrap text-sm leading-normal text-muted",
				children: product.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 border-t border-line pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg font-semibold tabular-nums",
					children: formatMoney(product.priceCents)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3",
					children: line ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								size: "icon",
								"aria-label": line.qty === 1 ? `Remove ${product.name}` : `Decrease ${product.name}`,
								onClick: () => setQty(product.id, line.qty - 1),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {
									className: "size-4",
									"aria-hidden": "true"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex-1 text-center text-sm font-semibold tabular-nums",
								"aria-live": "polite",
								children: [line.qty, " in cart"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								size: "icon",
								"aria-label": `Increase ${product.name}`,
								disabled: line.qty >= 9,
								onClick: () => setQty(product.id, line.qty + 1),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
									className: "size-4",
									"aria-hidden": "true"
								})
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "w-full",
						onClick: () => addToCart(product.id),
						children: "Add to cart"
					})
				})]
			})
		]
	});
}
function Home() {
	const { settings } = useShop();
	usePageTitle();
	const tag = displayCashTag(settings.cashAppTag);
	const steps = [
		{
			title: "Add a tool",
			body: "Pick what you need. The cart stays on this device until you check out."
		},
		{
			title: "Leave name and email",
			body: "No account and no card number. The email is where the tool is delivered."
		},
		{
			title: "Pay on Cash App",
			body: `Send the exact total to ${tag} and put your order ID in the note.`
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "content",
		className: "mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-cash",
				children: tag
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl",
				children: settings.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-xl text-lg text-muted",
				children: settings.tagline
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-sm text-foreground",
				children: "Card numbers are never collected. Digital tools are emailed after the Cash App payment shows your order ID."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				"aria-labelledby": "tools-heading",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-baseline justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "tools-heading",
						className: "text-lg font-semibold",
						children: "Tools"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm tabular-nums text-muted",
						children: settings.products.length
					})]
				}), settings.products.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: settings.products.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product }, product.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-card border border-line bg-surface p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Nothing in the vault yet."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/editor",
						className: `${buttonClass({ variant: "secondary" })} mt-4`,
						children: "Add a tool"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14",
				"aria-labelledby": "pay-heading",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "pay-heading",
					className: "text-lg font-semibold",
					children: "How to pay"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-4 grid gap-4 sm:grid-cols-3",
					children: steps.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-card border border-line bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-semibold tabular-nums text-cash",
								children: index + 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 text-base font-semibold",
								children: step.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-normal text-muted",
								children: step.body
							})
						]
					}, step.title))
				})]
			})
		]
	});
}
//#endregion
export { Home as component };
