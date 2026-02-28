import { NextResponse } from "next/server";
import { getBasicAuthHeader, getSpringBaseUrl } from "@/lib/spring";

export async function GET(req: Request) {
    const auth = await getBasicAuthHeader();
    if (!auth) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") ?? "";

    const res = await fetch(`${getSpringBaseUrl()}/api/people?q=${encodeURIComponent(q)}`, {
        headers: { Authorization: auth },
        cache: "no-store",
    });

    const data = await res.json().catch(() => null);
    return NextResponse.json(data, { status: res.status });
}