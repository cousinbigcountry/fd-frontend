import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteNavbar } from "@/components/siteui/site-navbar";
import "./globals.css";
import { SiteFooter } from "@/components/siteui/site-footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Fountline Digital",
    description: "Fountline Digital",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
        >
        <SiteNavbar
            /*isAuthenticated={false}
            userName={null}
            onLogin={() => console.log("login")}
            onLogout={() => console.log("logout")}
            portalHref="/portal" */
        />
        {children}

        <SiteFooter />
        </body>
        </html>
    );
}
