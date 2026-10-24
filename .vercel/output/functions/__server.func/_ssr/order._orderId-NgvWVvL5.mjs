import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as displayCashTag, h as isValidEmail, m as formatMoney, n as Route, o as usePageTitle, s as useShop, u as cashAppUrl } from "./router-CQ7bANBs.mjs";
import { n as buttonClass, r as fieldClass } from "./ui-S8JtiB-r.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order._orderId-NgvWVvL5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OrderPage() {
	const { orderId } = Route.useParams();
	const { ready, settings, findOrder, updateOrderEmail } = useShop();
	const order = findOrder(orderId);
	usePageTitle("Pay");
	const [copied, setCopied] = (0, import_react.useState)("idle");
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [email, setEmail] = (0, import_react.useState)(order?.email ?? "");
	const [emailError, setEmailError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
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
		window.setTimeout(() => setCopied("idle"), 2e3);
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
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "content",
		className: "mx-auto w-full max-w-xl px-4 py-10 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-semibold tracking-tight",
			children: "Pay with Cash App"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 text-sm text-muted",
			children: [
				"Loading order ",
				orderId,
				"…"
			]
		})]
	});
	if (!order) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "content",
		className: "mx-auto w-full max-w-xl px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "text-3xl font-semibold tracking-tight",
				children: ["Order ", orderId]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm leading-normal text-muted",
				children: [
					"This receipt lives on the device that checked out. You can still send the payment and put ",
					orderId,
					" in the Cash App note."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: cashAppUrl(settings.cashAppTag),
				target: "_blank",
				rel: "noopener noreferrer",
				className: `${buttonClass()} mt-6 w-full`,
				children: "Open Cash App"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mt-4 inline-flex h-11 items-center text-sm font-medium text-muted",
				children: "Back to the shop"
			})
		]
	});
	const tag = displayCashTag(order.cashAppTag);
	const when = formatWhen(order.createdAt);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "content",
		className: "mx-auto w-full max-w-xl px-4 py-8 sm:px-6 sm:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-cash",
				children: "Cash App only"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 text-3xl font-semibold tracking-tight sm:text-4xl",
				children: "Send this payment"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-normal text-muted",
				children: "You are not charged on this page. Send the exact total, and paste the note so the order can be matched to your email."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 rounded-card border border-line bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Order ID"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-mono text-2xl font-semibold tracking-wide",
						children: order.id
					}),
					when ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-faint",
						children: when
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-sm text-muted",
						children: "Send exactly"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-4xl font-semibold tabular-nums tracking-tight",
						children: formatMoney(order.totalCents)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted",
						children: ["to ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-foreground",
							children: tag
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						className: "mt-6 grid gap-3 text-sm leading-normal",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold tabular-nums text-cash",
									children: "1"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Open Cash App with the button below." })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold tabular-nums text-cash",
									children: "2"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Send exactly ",
									formatMoney(order.totalCents),
									" to ",
									tag,
									". Do not round it."
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold tabular-nums text-cash",
									children: "3"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Paste the note. It has your order ID and email." })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-6 grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium",
							children: "Cash App note"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							readOnly: true,
							value: order.note,
							"aria-label": "Cash App note",
							onFocus: (event) => event.currentTarget.select(),
							className: `${fieldClass} h-11 font-mono text-sm`
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: cashAppUrl(order.cashAppTag),
							target: "_blank",
							rel: "noopener noreferrer",
							className: buttonClass({ size: "full" }),
							children: [
								"Pay ",
								formatMoney(order.totalCents),
								" on Cash App"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => void copyNote(),
							className: buttonClass({
								variant: "secondary",
								size: "full"
							}),
							children: copied === "copied" ? "Note copied" : "Copy note"
						})]
					}),
					copied === "manual" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						role: "status",
						children: "Select the note and copy it."
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-faint",
						children: "Card numbers are never collected."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-4 rounded-card border border-line p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "Buyer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm",
						children: order.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm break-all text-muted",
						children: order.email
					}),
					editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium",
									children: "Fix email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: email,
									onChange: (event) => setEmail(event.target.value),
									inputMode: "email",
									autoComplete: "email",
									maxLength: 80,
									"aria-invalid": Boolean(emailError),
									className: `${fieldClass} h-11`
								})]
							}),
							emailError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-danger",
								role: "alert",
								children: emailError
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-faint",
								children: "Do this before you pay. It updates the note."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: buttonClass(),
									onClick: saveEmail,
									children: "Update note"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: buttonClass({ variant: "ghost" }),
									onClick: () => {
										setEditing(false);
										setEmail(order.email);
										setEmailError("");
									},
									children: "Cancel"
								})]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-3 inline-flex h-11 items-center text-sm font-medium text-muted hover:text-foreground",
						onClick: () => setEditing(true),
						children: "Fix email"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-4",
				"aria-label": "Items",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: order.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start justify-between gap-4 border-t border-line py-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-medium",
							children: item.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: ["Qty ", item.qty]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 tabular-nums",
						children: formatMoney(item.priceCents * item.qty)
					})]
				}, item.id)) })
			})
		]
	});
}
function formatWhen(iso) {
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return "";
	return new Intl.DateTimeFormat("en-US", {
		dateStyle: "medium",
		timeStyle: "short"
	}).format(date);
}
//#endregion
export { OrderPage as component };
