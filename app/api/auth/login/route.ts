import { NextResponse } from "next/server";
import { getSpringBaseUrl } from "@/lib/spring";

export async function POST(req: Request) {
    const body = await req.json().catch(() => null);
    const username = body?.username?.toString() ?? "";
    const password = body?.password?.toString() ?? "";

    if (!username || !password) {
        return NextResponse.json({ error: "Missing username or password" }, { status: 400 });
    }

    const basic = Buffer.from(`${username}:${password}`).toString("base64");


    const check = await fetch(`${getSpringBaseUrl()}/api/inventory`, {
        headers: { Authorization: `Basic ${basic}` },
        cache: "no-store",
    });

    if (!check.ok) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set("fd_basic", basic, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });
    return res;
}