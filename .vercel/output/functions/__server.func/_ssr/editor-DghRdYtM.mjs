import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as normalizeHandle, c as DEFAULT_SETTINGS, d as centsToInput, g as normalizeCashTag, i as ProductIcon, l as ICON_KEYS, o as usePageTitle, p as dollarsToCents, r as ICON_LABELS, s as useShop, u as cashAppUrl, v as tiktokUrl } from "./router-CQ7bANBs.mjs";
import { n as buttonClass, r as fieldClass, t as Button } from "./ui-S8JtiB-r.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/editor-DghRdYtM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var emptyErrors = () => ({ products: {} });
function toDraft(settings) {
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
			icon: product.icon
		}))
	};
}
function commitDraft(draft) {
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
	const products = [];
	const seen = /* @__PURE__ */ new Set();
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
		if (!/^[a-zA-Z0-9_-]{1,40}$/.test(id) || seen.has(id)) id = `tool-${index}`.slice(0, 40);
		seen.add(id);
		products.push({
			id,
			name: productName.slice(0, 80),
			priceCents: cents,
			description: product.description.trim().slice(0, 280),
			badge: product.badge.replace(/\s+/g, " ").trim().slice(0, 24),
			icon: product.icon
		});
	});
	if (errors.name || errors.tagline || errors.cashAppTag || errors.tiktokHandle) return { errors };
	if (Object.keys(errors.products).length) return { errors };
	return {
		errors,
		settings: {
			name: name.slice(0, 40),
			tagline: tagline.slice(0, 160),
			cashAppTag,
			tiktokHandle,
			products
		}
	};
}
function focusInvalid() {
	window.setTimeout(() => {
		document.querySelector("[aria-invalid='true']")?.focus();
	}, 0);
}
function EditorPage() {
	const navigate = useNavigate();
	const { ready, settings, updateSettings, resetSettings } = useShop();
	const [draft, setDraft] = (0, import_react.useState)(null);
	const [errors, setErrors] = (0, import_react.useState)(emptyErrors());
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [resetting, setResetting] = (0, import_react.useState)(false);
	usePageTitle("Editor");
	const booted = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!ready || booted.current) return;
		booted.current = true;
		setDraft(toDraft(settings));
	}, [ready, settings]);
	(0, import_react.useEffect)(() => {
		if (!saved) return;
		const timer = window.setTimeout(() => setSaved(false), 2400);
		return () => window.clearTimeout(timer);
	}, [saved]);
	if (!ready || !draft) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "content",
		className: "mx-auto w-full max-w-3xl px-4 py-10 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-semibold tracking-tight",
			children: "Website editor"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-muted",
			children: "Loading your shop…"
		})]
	});
	const dirty = JSON.stringify(draft) !== JSON.stringify(toDraft(settings));
	const tagPreview = normalizeCashTag(draft.cashAppTag);
	const handlePreview = normalizeHandle(draft.tiktokHandle);
	function apply(next) {
		setDraft(next);
		setSaved(false);
	}
	function persist(nextDraft) {
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
	function onSubmit(event) {
		event.preventDefault();
		persist(draft);
	}
	function onView(event) {
		if (!dirty) return;
		event.preventDefault();
		if (!persist(draft)) return;
		navigate({ to: "/" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "content",
		className: "mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-semibold tracking-tight sm:text-4xl",
				children: "Website editor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-sm leading-normal text-muted",
				children: "Change the shop, save, then view it. This stays on the device, so the site works as soon as you publish it. New visitors see the built-in ToolVault catalog."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-8 grid gap-8",
				onSubmit,
				noValidate: true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Actions, {
						saved,
						dirty,
						onView
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "grid gap-4",
						"aria-labelledby": "shop-fields",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								id: "shop-fields",
								className: "text-lg font-semibold",
								children: "Shop"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium",
										children: "Store name"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: draft.name,
										maxLength: 40,
										autoComplete: "off",
										"aria-invalid": Boolean(errors.name),
										onChange: (event) => apply({
											...draft,
											name: event.target.value
										}),
										className: `${fieldClass} h-11`
									}),
									errors.name ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { children: errors.name }) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium",
										children: "Tagline"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: draft.tagline,
										maxLength: 160,
										autoComplete: "off",
										"aria-invalid": Boolean(errors.tagline),
										onChange: (event) => apply({
											...draft,
											tagline: event.target.value
										}),
										className: `${fieldClass} h-11`
									}),
									errors.tagline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { children: errors.tagline }) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium",
										children: "Cash App tag"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "relative block",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted",
											children: "$"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: draft.cashAppTag,
											maxLength: 20,
											autoComplete: "off",
											spellCheck: false,
											"aria-invalid": Boolean(errors.cashAppTag),
											onChange: (event) => apply({
												...draft,
												cashAppTag: event.target.value
											}),
											className: `${fieldClass} h-11 pl-7`
										})]
									}),
									errors.cashAppTag ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { children: errors.cashAppTag }) : tagPreview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: cashAppUrl(tagPreview),
										target: "_blank",
										rel: "noopener noreferrer",
										className: "text-sm text-cash hover:underline",
										children: ["Test cash.app/$", tagPreview]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-faint",
										children: "Letters and numbers only."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium",
										children: "TikTok handle"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "relative block",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted",
											children: "@"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: draft.tiktokHandle,
											maxLength: 24,
											autoComplete: "off",
											spellCheck: false,
											"aria-invalid": Boolean(errors.tiktokHandle),
											onChange: (event) => apply({
												...draft,
												tiktokHandle: event.target.value
											}),
											className: `${fieldClass} h-11 pl-7`
										})]
									}),
									errors.tiktokHandle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { children: errors.tiktokHandle }) : handlePreview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: tiktokUrl(handlePreview),
										target: "_blank",
										rel: "noopener noreferrer",
										className: "text-sm text-cash hover:underline",
										children: ["Test tiktok.com/@", handlePreview]
									}) : null
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "grid gap-4",
						"aria-labelledby": "product-fields",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									id: "product-fields",
									className: "text-lg font-semibold",
									children: "Tools"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "secondary",
									disabled: draft.products.length >= 30,
									onClick: () => {
										const id = `tool-${Math.random().toString(36).slice(2, 8)}`;
										apply({
											...draft,
											products: [...draft.products, {
												id,
												name: "",
												price: "9.99",
												description: "",
												badge: "",
												icon: "wrench"
											}]
										});
										window.setTimeout(() => {
											document.getElementById(`product-${id}`)?.scrollIntoView({ block: "center" });
										}, 50);
									},
									children: "Add tool"
								})]
							}),
							draft.products.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "The shop is empty until you add a tool."
							}) : null,
							draft.products.map((product) => {
								const productError = errors.products[product.id];
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									id: `product-${product.id}`,
									className: "grid gap-4 rounded-card border border-line bg-surface p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-medium",
												id: `icon-label-${product.id}`,
												children: "Icon"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												role: "group",
												"aria-labelledby": `icon-label-${product.id}`,
												className: "flex flex-wrap gap-2",
												children: ICON_KEYS.map((key) => {
													const selected = product.icon === key;
													return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														"aria-pressed": selected,
														"aria-label": ICON_LABELS[key],
														onClick: () => apply({
															...draft,
															products: draft.products.map((item) => item.id === product.id ? {
																...item,
																icon: key
															} : item)
														}),
														className: `inline-flex size-11 items-center justify-center rounded-control border transition-colors duration-150 ${selected ? "border-cash bg-background text-foreground" : "border-line bg-background text-muted hover:text-foreground"}`,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductIcon, {
															name: key,
															className: "size-5"
														})
													}, key);
												})
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-4 sm:grid-cols-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "grid gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm font-medium",
													children: "Name"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													value: product.name,
													maxLength: 80,
													autoComplete: "off",
													"aria-invalid": productError === "Name this tool.",
													onChange: (event) => apply({
														...draft,
														products: draft.products.map((item) => item.id === product.id ? {
															...item,
															name: event.target.value
														} : item)
													}),
													className: `${fieldClass} h-11`
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "grid gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm font-medium",
													children: "Price"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "relative block",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted",
														children: "$"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														value: product.price,
														inputMode: "decimal",
														autoComplete: "off",
														"aria-invalid": productError === "Enter a price like 24.99.",
														onChange: (event) => apply({
															...draft,
															products: draft.products.map((item) => item.id === product.id ? {
																...item,
																price: event.target.value
															} : item)
														}),
														className: `${fieldClass} h-11 pl-7`
													})]
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "grid gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-medium",
												children: "Badge"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: product.badge,
												maxLength: 24,
												autoComplete: "off",
												onChange: (event) => apply({
													...draft,
													products: draft.products.map((item) => item.id === product.id ? {
														...item,
														badge: event.target.value
													} : item)
												}),
												className: `${fieldClass} h-11`
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "grid gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-medium",
												children: "Description"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												value: product.description,
												maxLength: 280,
												rows: 3,
												onChange: (event) => apply({
													...draft,
													products: draft.products.map((item) => item.id === product.id ? {
														...item,
														description: event.target.value
													} : item)
												}),
												className: `${fieldClass} min-h-24 py-3`
											})]
										}),
										productError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { children: productError }) : null,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "inline-flex h-11 items-center text-sm font-medium text-danger",
											onClick: () => apply({
												...draft,
												products: draft.products.filter((item) => item.id !== product.id)
											}),
											children: "Remove tool"
										}) })
									]
								}, product.id);
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "rounded-card border border-line p-4",
						children: resetting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm leading-normal text-muted",
								children: "Replace your edits with the original ToolVault catalog, Cash App tag, and TikTok handle? This only affects this browser."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									onClick: () => {
										resetSettings();
										setDraft(toDraft(DEFAULT_SETTINGS));
										setErrors(emptyErrors());
										setResetting(false);
										setSaved(true);
									},
									children: "Reset shop"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "secondary",
									onClick: () => setResetting(false),
									children: "Keep edits"
								})]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "inline-flex h-11 items-center text-sm font-medium text-muted hover:text-foreground",
							onClick: () => setResetting(true),
							children: "Reset to original shop"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Actions, {
						saved,
						dirty,
						onView
					})
				]
			})
		]
	});
}
function Actions({ saved, dirty, onView }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				children: "Save"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				onClick: onView,
				className: buttonClass({ variant: "secondary" }),
				children: "View shop"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				role: "status",
				children: saved ? "Saved on this device." : dirty ? "Unsaved changes" : "Up to date"
			})
		]
	});
}
function FieldError({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-sm text-danger",
		role: "alert",
		children
	});
}
//#endregion
export { EditorPage as component };
