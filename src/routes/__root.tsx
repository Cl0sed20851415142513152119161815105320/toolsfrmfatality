import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { Footer, Header } from "@/components/shell";
import { ShopProvider } from "@/lib/shop";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ToolVault" },
      {
        name: "description",
        content:
          "ToolVault sells digital tools. Pay with Cash App only. Card numbers are never collected.",
      },
      { name: "theme-color", content: "#070908" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <ShopProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <div className="flex-1">
                <Outlet />
              </div>
              <Footer />
            </div>
          </ShopProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
