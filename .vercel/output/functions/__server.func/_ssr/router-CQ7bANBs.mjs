import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, _ as createFileRoute, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, v as createRootRoute, x as useRouter, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as CalendarClock, a as ShoppingBag, d as Layers, f as KeyRound, g as ChartColumn, h as CodeXml, i as Terminal, l as Pencil, m as Gauge, n as Wrench, o as Shield, p as Globe, r as TriangleAlert, s as Search, t as Zap, v as Bot, y as Activity } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CQ7bANBs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var ICON_KEYS = [
	"search",
	"key",
	"activity",
	"code",
	"bot",
	"calendar",
	"shield",
	"zap",
	"terminal",
	"chart",
	"globe",
	"gauge",
	"layers",
	"wrench"
];
var DEFAULT_SETTINGS = {
	name: "ToolVault",
	tagline: "Premium digital tools. Pay with Cash App and nothing else.",
	cashAppTag: "josephdaniel20",
	tiktokHandle: "iifatality",
	products: [
		{
			id: "seo",
			name: "SEO Analyzer Pro",
			priceCents: 2499,
			description: "Check titles, meta descriptions, headings, and indexability. You get a prioritized fix list, not a 40-page dump.",
			badge: "Best seller",
			icon: "search"
		},
		{
			id: "passwords",
			name: "Password Vault Generator",
			priceCents: 999,
			description: "Create long unique passwords and store them in an encrypted file that stays on your machine.",
			badge: "Starter",
			icon: "key"
		},
		{
			id: "uptime",
			name: "Uptime Monitor Toolkit",
			priceCents: 1999,
			description: "Watch URLs on a timer, record response time, and publish a plain status page for clients.",
			badge: "Ops",
			icon: "activity"
		},
		{
			id: "snippets",
			name: "Code Snippet Manager",
			priceCents: 1499,
			description: "Keep the snippets you reuse, tagged and searchable, with one-click copy.",
			badge: "Dev",
			icon: "code"
		},
		{
			id: "prompts",
			name: "AI Prompt Engineering Pack",
			priceCents: 1799,
			description: "Fill-in prompt briefs for research, editing, and code review. Patterns you can reuse, not a quote list.",
			badge: "New",
			icon: "bot"
		},
		{
			id: "scheduler",
			name: "Social Media Scheduler",
			priceCents: 2299,
			description: "Plan a week of posts, assign times, and export a calendar you can follow without a team tool.",
			badge: "Growth",
			icon: "calendar"
		}
	]
};
var ICON_SET = new Set(ICON_KEYS);
function isIconKey(value) {
	return ICON_SET.has(value);
}
function formatMoney(cents) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD"
	}).format(cents / 100);
}
function centsToInput(cents) {
	return (cents / 100).toFixed(2);
}
function dollarsToCents(value) {
	const cleaned = value.trim().replace(/^\$/, "");
	if (!/^\d{1,4}(\.\d{1,2})?$/.test(cleaned)) return null;
	const [dollars, fraction = ""] = cleaned.split(".");
	const cents = Number(dollars) * 100 + Number(fraction.padEnd(2, "0"));
	if (!Number.isInteger(cents) || cents > 999999) return null;
	return cents;
}
function normalizeCashTag(input) {
	return input.trim().replace(/^\$+/, "").replace(/[^a-zA-Z0-9]/g, "").slice(0, 20);
}
function normalizeHandle(input) {
	return input.trim().replace(/^@+/, "").replace(/[^a-zA-Z0-9._]/g, "").slice(0, 24);
}
function cashAppUrl(tag) {
	return `https://cash.app/$${normalizeCashTag(tag) || DEFAULT_SETTINGS.cashAppTag}`;
}
function displayCashTag(tag) {
	return `$${normalizeCashTag(tag) || DEFAULT_SETTINGS.cashAppTag}`;
}
function tiktokUrl(handle) {
	return `https://www.tiktok.com/@${normalizeHandle(handle) || DEFAULT_SETTINGS.tiktokHandle}`;
}
function cleanText(value, max) {
	if (typeof value !== "string") return "";
	return value.replace(/[\u0000-\u001F\u007F]/g, "").trim().replace(/\s+/g, " ").slice(0, max);
}
function cleanMultiline(value, max) {
	if (typeof value !== "string") return "";
	return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max);
}
function parseProduct(raw) {
	if (!raw || typeof raw !== "object") return null;
	const o = raw;
	const name = cleanText(o.name, 80);
	const priceCents = o.priceCents;
	if (!name) return null;
	if (typeof priceCents !== "number" || !Number.isInteger(priceCents)) return null;
	if (priceCents < 0 || priceCents > 999999) return null;
	return {
		id: typeof o.id === "string" && /^[a-zA-Z0-9_-]{1,40}$/.test(o.id) ? o.id : `tool-${name.length}`,
		name,
		priceCents,
		description: cleanMultiline(o.description, 280),
		badge: cleanText(o.badge, 24),
		icon: typeof o.icon === "string" && isIconKey(o.icon) ? o.icon : "wrench"
	};
}
function parseSettings(raw) {
	if (!raw || typeof raw !== "object") return DEFAULT_SETTINGS;
	const o = raw;
	const name = cleanText(o.name, 40);
	const tagline = cleanText(o.tagline, 160);
	const cashAppTag = normalizeCashTag(typeof o.cashAppTag === "string" ? o.cashAppTag : "");
	const tiktokHandle = normalizeHandle(typeof o.tiktokHandle === "string" ? o.tiktokHandle : "");
	const products = Array.isArray(o.products) ? o.products.flatMap((item) => {
		const product = parseProduct(item);
		return product ? [product] : [];
	}) : DEFAULT_SETTINGS.products;
	const seen = /* @__PURE__ */ new Set();
	const unique = products.map((product, index) => {
		let id = product.id;
		if (seen.has(id)) id = `${id}-${index}`.slice(0, 40);
		seen.add(id);
		return {
			...product,
			id
		};
	});
	return {
		name: name || DEFAULT_SETTINGS.name,
		tagline: tagline || DEFAULT_SETTINGS.tagline,
		cashAppTag: cashAppTag || DEFAULT_SETTINGS.cashAppTag,
		tiktokHandle: tiktokHandle || DEFAULT_SETTINGS.tiktokHandle,
		products: unique.slice(0, 30)
	};
}
function parseCart(raw) {
	if (!Array.isArray(raw)) return [];
	const lines = [];
	for (const item of raw) {
		if (!item || typeof item !== "object") continue;
		const line = item;
		if (typeof line.productId !== "string" || !/^[a-zA-Z0-9_-]{1,40}$/.test(line.productId)) continue;
		if (!Number.isInteger(line.qty) || (line.qty ?? 0) < 1 || (line.qty ?? 0) > 9) continue;
		if (lines.some((existing) => existing.productId === line.productId)) continue;
		lines.push({
			productId: line.productId,
			qty: line.qty
		});
	}
	return lines.slice(0, 30);
}
function parseOrder(raw) {
	if (!raw || typeof raw !== "object") return null;
	const o = raw;
	if (typeof o.id !== "string" || !/^TV-[A-Z2-9]{6,12}$/.test(o.id)) return null;
	if (typeof o.email !== "string" || typeof o.name !== "string") return null;
	if (!Array.isArray(o.items) || typeof o.totalCents !== "number") return null;
	const items = [];
	for (const item of o.items) {
		if (!item || typeof item !== "object") return null;
		const row = item;
		if (typeof row.id !== "string" || typeof row.name !== "string") return null;
		if (!Number.isInteger(row.priceCents) || !Number.isInteger(row.qty)) return null;
		if ((row.qty ?? 0) < 1 || (row.priceCents ?? 0) < 0) return null;
		items.push({
			id: row.id,
			name: cleanText(row.name, 80),
			priceCents: row.priceCents,
			qty: row.qty
		});
	}
	if (!items.length) return null;
	return {
		id: o.id,
		name: cleanText(o.name, 60),
		email: o.email.trim().slice(0, 80),
		items,
		totalCents: o.totalCents,
		cashAppTag: normalizeCashTag(typeof o.cashAppTag === "string" ? o.cashAppTag : "") || DEFAULT_SETTINGS.cashAppTag,
		note: cleanText(o.note, 120),
		createdAt: typeof o.createdAt === "string" ? o.createdAt : (/* @__PURE__ */ new Date(0)).toISOString()
	};
}
function parseOrders(raw) {
	if (!Array.isArray(raw)) return [];
	return raw.flatMap((item) => {
		const order = parseOrder(item);
		return order ? [order] : [];
	}).slice(0, 50);
}
function isValidEmail(value) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 80;
}
function paymentNote(orderId, email) {
	return `${orderId} ${email.trim()}`;
}
var ORDER_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function makeOrderId(existing) {
	const taken = new Set(existing);
	for (let attempt = 0; attempt < 8; attempt += 1) {
		let id = "TV-";
		const bytes = /* @__PURE__ */ new Uint32Array(6);
		if (typeof crypto !== "undefined" && crypto.getRandomValues) {
			crypto.getRandomValues(bytes);
			for (let i = 0; i < bytes.length; i += 1) id += ORDER_ALPHABET[bytes[i] % 32];
		} else for (let i = 0; i < 6; i += 1) id += ORDER_ALPHABET[Math.floor(Math.random() * 32)];
		if (!taken.has(id)) return id;
	}
	let extra = "TV-";
	for (let i = 0; i < 8; i += 1) extra += ORDER_ALPHABET[Math.floor(Math.random() * 32)];
	return extra;
}
var SETTINGS_KEY = "toolvault.settings.v1";
var CART_KEY = "toolvault.cart.v1";
var ORDERS_KEY = "toolvault.orders.v1";
var ShopContext = (0, import_react.createContext)(null);
function readStored(key, parse, fallback) {
	try {
		const raw = localStorage.getItem(key);
		if (!raw) return fallback;
		return parse(JSON.parse(raw));
	} catch {
		return fallback;
	}
}
function writeStored(key, value) {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch {}
}
function ShopProvider({ children }) {
	const [settings, setSettings] = (0, import_react.useState)(DEFAULT_SETTINGS);
	const [cart, setCart] = (0, import_react.useState)([]);
	const [orders, setOrders] = (0, import_react.useState)([]);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setSettings(readStored(SETTINGS_KEY, parseSettings, DEFAULT_SETTINGS));
		setCart(readStored(CART_KEY, parseCart, []));
		setOrders(readStored(ORDERS_KEY, parseOrders, []));
		setReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		writeStored(SETTINGS_KEY, settings);
	}, [ready, settings]);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		writeStored(CART_KEY, cart);
	}, [ready, cart]);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		writeStored(ORDERS_KEY, orders);
	}, [ready, orders]);
	const value = {
		ready,
		settings,
		cart,
		orders,
		addToCart: (productId) => {
			if (!settings.products.some((product) => product.id === productId)) return;
			setCart((prev) => {
				const found = prev.find((line) => line.productId === productId);
				if (!found) return [...prev, {
					productId,
					qty: 1
				}];
				if (found.qty >= 9) return prev;
				return prev.map((line) => line.productId === productId ? {
					...line,
					qty: line.qty + 1
				} : line);
			});
		},
		setQty: (productId, qty) => {
			setCart((prev) => {
				if (qty <= 0) return prev.filter((line) => line.productId !== productId);
				const nextQty = Math.min(9, qty);
				if (!prev.some((line) => line.productId === productId)) return [...prev, {
					productId,
					qty: nextQty
				}];
				return prev.map((line) => line.productId === productId ? {
					...line,
					qty: nextQty
				} : line);
			});
		},
		removeFromCart: (productId) => {
			setCart((prev) => prev.filter((line) => line.productId !== productId));
		},
		clearCart: () => setCart([]),
		updateSettings: (next) => setSettings(parseSettings(next)),
		resetSettings: () => {
			setSettings(DEFAULT_SETTINGS);
			setCart([]);
		},
		placeOrder: (buyer) => {
			const name = buyer.name.replace(/[\u0000-\u001F\u007F]/g, "").trim().replace(/\s+/g, " ").slice(0, 60);
			const email = buyer.email.trim().replace(/\s+/g, "");
			if (name.length < 2 || !isValidEmail(email)) return null;
			const items = [];
			for (const line of cart) {
				const product = settings.products.find((item) => item.id === line.productId);
				if (!product) continue;
				items.push({
					id: product.id,
					name: product.name,
					priceCents: product.priceCents,
					qty: line.qty
				});
			}
			if (!items.length) return null;
			const id = makeOrderId(orders.map((order) => order.id));
			const order = {
				id,
				name,
				email,
				items,
				totalCents: items.reduce((sum, item) => sum + item.priceCents * item.qty, 0),
				cashAppTag: settings.cashAppTag,
				note: paymentNote(id, email),
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			};
			const nextOrders = [order, ...orders].slice(0, 50);
			writeStored(ORDERS_KEY, nextOrders);
			writeStored(CART_KEY, []);
			setOrders(nextOrders);
			setCart([]);
			return order;
		},
		updateOrderEmail: (orderId, email) => {
			const nextEmail = email.trim().replace(/\s+/g, "");
			if (!isValidEmail(nextEmail)) return "Enter a valid email.";
			if (!orders.some((order) => order.id === orderId)) return "That order is not on this device.";
			setOrders((prev) => prev.map((order) => order.id === orderId ? {
				...order,
				email: nextEmail,
				note: paymentNote(order.id, nextEmail)
			} : order));
			return null;
		},
		findOrder: (orderId) => orders.find((order) => order.id === orderId)
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopContext.Provider, {
		value,
		children
	});
}
function useShop() {
	const value = (0, import_react.useContext)(ShopContext);
	if (!value) throw new Error("Shop is unavailable.");
	return value;
}
function useCartDetails() {
	const { cart, settings } = useShop();
	const lines = cart.flatMap((line) => {
		const product = settings.products.find((item) => item.id === line.productId);
		if (!product) return [];
		return [{
			...line,
			product,
			lineCents: product.priceCents * line.qty
		}];
	});
	return {
		lines,
		count: lines.reduce((sum, line) => sum + line.qty, 0),
		totalCents: lines.reduce((sum, line) => sum + line.lineCents, 0)
	};
}
function usePageTitle(page) {
	const { settings, ready } = useShop();
	(0, import_react.useEffect)(() => {
		const name = ready ? settings.name : "ToolVault";
		document.title = page ? `${page} · ${name}` : name;
	}, [
		page,
		ready,
		settings.name
	]);
}
var ICONS = {
	search: Search,
	key: KeyRound,
	activity: Activity,
	code: CodeXml,
	bot: Bot,
	calendar: CalendarClock,
	shield: Shield,
	zap: Zap,
	terminal: Terminal,
	chart: ChartColumn,
	globe: Globe,
	gauge: Gauge,
	layers: Layers,
	wrench: Wrench
};
var ICON_LABELS = {
	search: "Search",
	key: "Key",
	activity: "Activity",
	code: "Code",
	bot: "Bot",
	calendar: "Calendar",
	shield: "Shield",
	zap: "Bolt",
	terminal: "Terminal",
	chart: "Chart",
	globe: "Globe",
	gauge: "Gauge",
	layers: "Layers",
	wrench: "Wrench"
};
function ProductIcon({ name, className }) {
	const Icon = ICONS[name] ?? Wrench;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
		className,
		strokeWidth: 1.75,
		"aria-hidden": "true"
	});
}
function TikTokIcon({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className,
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
		})
	});
}
function Mark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className,
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			width: "32",
			height: "32",
			rx: "8",
			className: "fill-cash"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "var(--color-ink)",
			d: "M16 6.2a5.1 5.1 0 0 1 2.2 9.6L21 25.2h-10l2.8-9.4A5.1 5.1 0 0 1 16 6.2zm0 2.6a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8z"
		})]
	});
}
function Header() {
	const { settings } = useShop();
	const { count } = useCartDetails();
	const itemLabel = count === 1 ? "item" : "items";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-20 border-b border-line bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: "#content",
			className: "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:inline-flex focus:h-11 focus:items-center focus:rounded-control focus:bg-cash focus:px-4 focus:font-semibold focus:text-ink",
			children: "Skip to content"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 w-full max-w-6xl items-center gap-2 px-4 sm:gap-3 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "flex min-w-0 flex-1 items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-8 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate text-base font-semibold tracking-tight",
					children: settings.name
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/editor",
						"aria-label": "Website editor",
						className: "inline-flex h-11 items-center justify-center rounded-control px-2 text-muted transition-colors duration-150 hover:bg-surface hover:text-foreground sm:px-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
							className: "size-5 sm:hidden",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden text-sm font-medium sm:inline",
							children: "Editor"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/cart",
						"aria-label": `Cart, ${count} ${itemLabel}`,
						className: "inline-flex h-11 items-center gap-1.5 rounded-control px-2 text-foreground transition-colors duration-150 hover:bg-surface sm:px-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
							className: "size-5",
							strokeWidth: 1.75,
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold tabular-nums",
							children: count
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: tiktokUrl(settings.tiktokHandle),
						target: "_blank",
						rel: "noopener noreferrer",
						"aria-label": `TikTok @${settings.tiktokHandle}`,
						className: "inline-flex size-11 items-center justify-center rounded-control text-foreground transition-colors duration-150 hover:bg-surface",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TikTokIcon, { className: "size-5" })
					})
				]
			})]
		})]
	});
}
function Footer() {
	const { settings } = useShop();
	const tag = displayCashTag(settings.cashAppTag);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "mt-auto border-t border-line",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Cash App only. Card numbers are never collected." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/editor",
					className: "font-medium text-foreground hover:text-cash",
					children: "Website editor"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: cashAppUrl(settings.cashAppTag),
					target: "_blank",
					rel: "noopener noreferrer",
					className: "font-semibold tabular-nums text-foreground hover:text-cash",
					children: tag
				})]
			})]
		})
	});
}
var styles_default = "/assets/styles-DEjWgYgk.css";
var Route$4 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "ToolVault" },
			{
				name: "description",
				content: "ToolVault sells digital tools. Pay with Cash App only. Card numbers are never collected."
			},
			{
				name: "theme-color",
				content: "#070908"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: RootComponent
});
function RootComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-screen flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
				]
			}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$3 = () => import("./routes-DQIHAKBv.mjs");
var Route$3 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./cart-bc8-9GMm.mjs");
var Route$2 = createFileRoute("/cart")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./editor-DghRdYtM.mjs");
var Route$1 = createFileRoute("/editor")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./order._orderId-NgvWVvL5.mjs");
var Route = createFileRoute("/order/$orderId")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$3.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$4
	}),
	CartRoute: Route$2.update({
		id: "/cart",
		path: "/cart",
		getParentRoute: () => Route$4
	}),
	EditorRoute: Route$1.update({
		id: "/editor",
		path: "/editor",
		getParentRoute: () => Route$4
	}),
	OrderOrderIdRoute: Route.update({
		id: "/order/$orderId",
		path: "/order/$orderId",
		getParentRoute: () => Route$4
	})
};
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { normalizeHandle as _, useCartDetails as a, DEFAULT_SETTINGS as c, centsToInput as d, displayCashTag as f, normalizeCashTag as g, isValidEmail as h, ProductIcon as i, ICON_KEYS as l, formatMoney as m, Route as n, usePageTitle as o, dollarsToCents as p, ICON_LABELS as r, useShop as s, router_exports as t, cashAppUrl as u, tiktokUrl as v };
