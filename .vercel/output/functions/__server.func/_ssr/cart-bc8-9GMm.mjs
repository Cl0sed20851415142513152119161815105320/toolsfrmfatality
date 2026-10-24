import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Plus, u as Minus } from "../_libs/lucide-react.mjs";
import { a as useCartDetails, h as isValidEmail, i as ProductIcon, m as formatMoney, o as usePageTitle, s as useShop } from "./router-CQ7bANBs.mjs";
import { r as fieldClass, t as Button } from "./ui-S8JtiB-r.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-bc8-9GMm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CartPage() {
	const navigate = useNavigate();
	const { setQty, removeFromCart, placeOrder } = useShop();
	const { lines, count, totalCents } = useCartDetails();
	usePageTitle("Cart");
	const submitting = (0, import_react.useRef)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [nameError, setNameError] = (0, import_react.useState)("");
	const [emailError, setEmailError] = (0, import_react.useState)("");
	const [formError, setFormError] = (0, import_react.useState)("");
	function onSubmit(event) {
		event.preventDefault();
		if (submitting.current) return;
		const nextName = name.trim();
		const nextEmail = email.trim();
		const nextNameError = nextName.length < 2 ? "Enter the name for this order." : "";
		const nextEmailError = isValidEmail(nextEmail) ? "" : "Enter a valid email. The tool is delivered there.";
		setNameError(nextNameError);
		setEmailError(nextEmailError);
		setFormError("");
		if (nextNameError || nextEmailError) return;
		submitting.current = true;
		const order = placeOrder({
			name: nextName,
			email: nextEmail
		});
		if (!order) {
			submitting.current = false;
			setFormError("Your cart is empty.");
			return;
		}
		navigate({
			to: "/order/$orderId",
			params: { orderId: order.id },
			replace: true
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "content",
		className: "mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-semibold tracking-tight sm:text-4xl",
			children: "Cart"
		}), count === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: "Your cart is empty."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: `${buttonLink()} mt-6`,
				children: "Browse tools"
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				"aria-label": "Items",
				className: "rounded-card border border-line bg-surface p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-3 border-b border-line py-4 first:pt-0 last:border-b-0 last:pb-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-11 shrink-0 items-center justify-center rounded-control bg-background",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductIcon, {
							name: line.product.icon,
							className: "size-5"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-base font-semibold",
								children: line.product.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "shrink-0 text-sm font-semibold tabular-nums",
								children: formatMoney(line.lineCents)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "secondary",
									size: "icon",
									"aria-label": line.qty === 1 ? `Remove ${line.product.name}` : `Decrease ${line.product.name}`,
									onClick: () => setQty(line.product.id, line.qty - 1),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {
										className: "size-4",
										"aria-hidden": "true"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-8 text-center text-sm font-semibold tabular-nums",
									children: line.qty
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "secondary",
									size: "icon",
									"aria-label": `Increase ${line.product.name}`,
									disabled: line.qty >= 9,
									onClick: () => setQty(line.product.id, line.qty + 1),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
										className: "size-4",
										"aria-hidden": "true"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "ml-auto inline-flex h-11 items-center px-2 text-sm font-medium text-muted hover:text-danger",
									onClick: () => removeFromCart(line.product.id),
									children: "Remove"
								})
							]
						})]
					})]
				}, line.product.id)) })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-card border border-line bg-surface p-4",
				"aria-labelledby": "checkout-heading",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "checkout-heading",
						className: "text-lg font-semibold",
						children: "Checkout"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm leading-normal text-muted",
						children: [
							"Name and email only. You will not enter a card number. Next, send",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold tabular-nums text-foreground",
								children: formatMoney(totalCents)
							}),
							" ",
							"on Cash App with your order ID in the note."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-5 grid gap-4",
						onSubmit,
						noValidate: true,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium",
										children: "Name"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: name,
										onChange: (event) => setName(event.target.value),
										autoComplete: "name",
										maxLength: 60,
										"aria-invalid": Boolean(nameError),
										className: `${fieldClass} h-11`
									}),
									nameError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-danger",
										role: "alert",
										children: nameError
									}) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium",
										children: "Email"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: email,
										onChange: (event) => setEmail(event.target.value),
										autoComplete: "email",
										inputMode: "email",
										maxLength: 80,
										"aria-invalid": Boolean(emailError),
										className: `${fieldClass} h-11`
									}),
									emailError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-danger",
										role: "alert",
										children: emailError
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-faint",
										children: "Included in the Cash App note so the tool can be sent to you."
									})
								]
							}),
							formError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-danger",
								role: "alert",
								children: formError
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3 border-t border-line pt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-muted",
									children: "Total"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-lg font-semibold tabular-nums",
									children: formatMoney(totalCents)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "w-full",
								children: "Get order ID"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-faint",
								children: "No tax or shipping. Send this exact total."
							})
						]
					})
				]
			})]
		})]
	});
}
function buttonLink() {
	return "inline-flex min-h-11 items-center justify-center rounded-control bg-cash px-4 text-sm font-semibold text-ink hover:bg-cash-deep";
}
//#endregion
export { CartPage as component };
