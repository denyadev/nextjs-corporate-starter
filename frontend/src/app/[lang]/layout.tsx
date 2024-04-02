import "./globals.css";
import { i18n } from "../../../i18n-config";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default async function RootLayout({
    children,
    params,
}: {
    readonly children: React.ReactNode;
    readonly params: { lang: string };
}) {
    return (
        <html lang={params.lang}>
            <body>
                {/* <Navbar
                    links={navbar.links}
                    logoUrl={navbarLogoUrl}
                    logoText={navbar.navbarLogo.logoText}
                /> */}

                <main className="dark:bg-black dark:text-gray-100 min-h-screen">
                    {children}
                </main>
                {/* 
                <Banner data={notificationBanner} /> */}
            </body>
        </html>
    );
}

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }));
}
