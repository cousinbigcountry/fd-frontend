"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function submit() {
        setError(null);
        setLoading(true);

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        setLoading(false);

        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            setError(data.error ?? "Login failed");
            return;
        }

        router.push("/inventory");
    }

    return (
        <main className="min-h-screen bg-black text-white">
            <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-12">
                <section>
                    <Card className="border-white/10 bg-black/40 backdrop-blur">
                        <CardHeader className="space-y-2">
                            <CardTitle className="text-white">Sign in</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <Input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                className="border-white/10 bg-black/40 text-white placeholder:text-white/40"
                                autoComplete="username"
                            />
                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                type="password"
                                className="border-white/10 bg-black/40 text-white placeholder:text-white/40"
                                autoComplete="current-password"
                            />

                            {error && <p className="text-sm text-red-500">{error}</p>}

                            <Button onClick={submit} disabled={loading} className="w-full bg-white text-black hover:bg-white/90">
                                {loading ? "Signing in..." : "Sign in"}
                            </Button>
                        </CardContent>

                        <CardFooter className="flex items-center justify-between">
                            <Link className="text-xs text-white/70 hover:text-white" href="/">
                                Back to site
                            </Link>
                        </CardFooter>
                    </Card>
                </section>
            </div>
        </main>
    );
}