"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const links = [
    { href: "/inventory", label: "Inventory" },
    { href: "/crm", label: "CRM" },
    { href: "/managers", label: "Managers" },
];

function isActive(pathname: string, href: string) {
    return pathname === href || pathname.startsWith(href + "/");
}

export default function PortalNav() {
    const pathname = usePathname();
    const router = useRouter();

    async function logout() {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/login");
    }

    return (
        <header className="sticky top-0 z-40 bg-black/90 backdrop-blur border-b border-white/10">
            <div className="mx-auto w-full max-w-6xl px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="h-9 w-9 rounded-xl border border-white/15 bg-white/5 flex items-center justify-center">
                            <span className="text-sm font-semibold text-white">FD</span>
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-semibold tracking-tight text-white">Fountline Digital</p>
                            <p className="text-xs text-white/60">Employee Portal</p>
                        </div>
                    </div>

                    <Button onClick={logout} variant="secondary" className="bg-white/10 text-white hover:bg-white/15">
                        Log out
                    </Button>
                </div>

                <Separator className="my-3 bg-white/10" />

                <nav className="flex flex-wrap gap-2">
                    {links.map((l) => {
                        const active = isActive(pathname, l.href);
                        return (
                            <Link
                                key={l.href}
                                href={l.href}
                                className={[
                                    "px-3 py-2 rounded-lg text-sm border transition",
                                    "border-white/10 hover:border-white/25 hover:bg-white/5",
                                    active ? "bg-white/10 border-white/30 text-white" : "text-white/80",
                                ].join(" ")}
                            >
                                {l.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
}