import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ui-S8JtiB-r.js
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 rounded-control px-4 text-sm font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground disabled:pointer-events-none disabled:opacity-40 min-h-11", {
	variants: {
		variant: {
			primary: "bg-cash text-ink hover:bg-cash-deep",
			secondary: "border border-line bg-surface text-foreground hover:border-line-strong hover:bg-surface-2",
			ghost: "text-muted hover:bg-surface hover:text-foreground",
			danger: "text-danger hover:bg-surface"
		},
		size: {
			md: "px-4",
			full: "w-full px-4",
			icon: "size-11 px-0"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ asChild = false, className, variant, size, type = "button", ...props }) {
	if (asChild) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slot, {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function buttonClass(options) {
	return buttonVariants(options);
}
var fieldClass = "w-full rounded-control border border-line bg-background px-3 text-base text-foreground outline-none transition-colors duration-150 placeholder:text-faint focus:border-cash";
//#endregion
export { buttonClass as n, fieldClass as r, Button as t };
