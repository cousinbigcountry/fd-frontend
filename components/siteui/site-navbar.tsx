"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, LogIn, LogOut, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NavItem = {
    label: string;
    href: string;
};

const NAV_ITEMS: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Solutions", href: "/solutions" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export type SiteNavbarProps = {

    isAuthenticated?: boolean;
    userName?: string | null;

    onLogin?: () => void;
    onLogout?: () => void;


    portalHref?: string;
};

export function SiteNavbar({
                               isAuthenticated = false,
                               userName = null,
                               onLogin,
                               onLogout,
                               portalHref = "/dashboard",
                           }: SiteNavbarProps) {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname?.startsWith(href);
    };

    const linkClass = (href: string) => {
        const active = isActive(href);
        return [
            "text-sm font-medium transition-colors",
            active ? "text-zinc-200" : "text-zinc-300",
            "hover:text-zinc-100",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        ].join(" ");
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/90 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-2">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                </div>

                <div className="flex items-center gap-2">
                    {isAuthenticated ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="h-8 px-2 text-zinc-200 hover:bg-zinc-900 hover:text-white"
                                >
                                    <User className="mr-2 h-4 w-4" />
                                    <span className="max-w-[160px] truncate text-xs">
                    {userName ?? "Account"}
                  </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="w-44 border-zinc-800 bg-black text-zinc-200"
                            >
                                <DropdownMenuItem asChild>
                                    <Link
                                        href={portalHref}
                                        className="cursor-pointer focus:bg-zinc-900"
                                    >
                                        Go to Portal
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer focus:bg-zinc-900"
                                    onClick={onLogout}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button
                            variant="outline"
                            className="h-8 border-zinc-700 bg-black text-zinc-200 hover:bg-zinc-900 hover:text-white"
                            onClick={onLogin}
                        >
                            <LogIn className="mr-2 h-4 w-4" />
                            <Link href="/login"><span className="text-xs">Log in</span></Link>
                        </Button>
                    )}
                </div>
            </div>

            <Separator className="bg-zinc-900" />

            {/* Main navbar */}
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/FD_Logo_White.svg"
                        alt="Fountline Digital"
                        width={200}
                        height={200}
                        priority
                        className="h-20 w-auto"
                    />
                    <span className="sr-only">Fountline Digital</span>
                </Link>

                {/* Desktop links */}
                <nav className="hidden items-center gap-6 md:flex">
                    {NAV_ITEMS.map((item) => (
                        <Link key={item.href} href={item.href} className={linkClass(item.href)}>
                            {item.label}
                            {isActive(item.href) ? (
                                <span className="mt-1 block h-[2px] w-full bg-zinc-500" />
                            ) : (
                                <span className="mt-1 block h-[2px] w-full bg-transparent" />
                            )}
                        </Link>
                    ))}
                </nav>


                <div className="hidden md:flex">
                    <Button
                        asChild
                        className="bg-zinc-200 text-black hover:bg-white"
                    >
                        <Link href="/contact">Get in touch</Link>
                    </Button>
                </div>

                {/* Mobile menu */}
                <div className="md:hidden">
                    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-zinc-200 hover:bg-zinc-900 hover:text-white"
                                aria-label="Open menu"
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="border-zinc-800 bg-black text-zinc-200"
                        >
                            <div className="flex items-center justify-between">
                                <Image
                                    src="/FD_Logo_White.svg"
                                    alt="Fountline Digital"
                                    width={150}
                                    height={36}
                                    className="h-7 w-auto"
                                />
                            </div>

                            <div className="mt-6 flex flex-col gap-2">
                                {NAV_ITEMS.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={[
                                            "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                            isActive(item.href)
                                                ? "bg-zinc-900 text-zinc-100"
                                                : "text-zinc-300 hover:bg-zinc-900 hover:text-white",
                                        ].join(" ")}
                                    >
                                        {item.label}
                                    </Link>
                                ))}

                                <Separator className="my-4 bg-zinc-900" />

                                <Button
                                    asChild
                                    className="bg-zinc-200 text-black hover:bg-white"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    <Link href="/contact">Get in touch</Link>
                                </Button>

                                <div className="mt-3">
                                    {isAuthenticated ? (
                                        <Button
                                            variant="outline"
                                            className="w-full border-zinc-700 bg-black text-zinc-200 hover:bg-zinc-900 hover:text-white"
                                            onClick={() => {
                                                setMobileOpen(false);
                                                onLogout?.();
                                            }}
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Log out
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            className="w-full border-zinc-700 bg-black text-zinc-200 hover:bg-zinc-900 hover:text-white"
                                            onClick={() => {
                                                setMobileOpen(false);
                                                onLogin?.();
                                            }}
                                        >
                                            <LogIn className="mr-2 h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}