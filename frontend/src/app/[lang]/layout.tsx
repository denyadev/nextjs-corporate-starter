import "../globals.css";
import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import i18nConfig from "../../../i18nConfig";
import { GlobalThemeProvider } from "@/context/global-theme-provider";
import { ZoomProvider } from "@/context/ZoomContext";
import Meeting from "@/components/MeetingComponent";

export const metadata: Metadata = {
  title: "DOTSapp",
  description: "Convention App",
};

export default async function RootLayout({
  children,
  params,
}: {
  readonly children: React.ReactNode;
  readonly params: { lang: string; slug: string[] };
}) {
  return (
    <html lang={params.lang}>
      <body className={`${GeistSans.className}`}>
        <ZoomProvider>
          <GlobalThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="absolute top-40 z-50">
              <Meeting />
            </div>
            {children}
            <Analytics />
          </GlobalThemeProvider>
          {/* Start of LiveChat code */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.__lc = window.__lc || {};
            window.__lc.license = 16134006;
            ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice))
          `,
            }}
          />
          <noscript>
            <a
              href="https://www.livechat.com/chat-with/16134006/"
              rel="nofollow"
            >
              Chat with us
            </a>
            , powered by{" "}
            <a
              href="https://www.livechat.com/?welcome"
              rel="noopener nofollow"
              target="_blank"
            >
              LiveChat
            </a>
          </noscript>
          {/* End of LiveChat code */}
        </ZoomProvider>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ lang: locale }));
}
