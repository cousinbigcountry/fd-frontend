import { NextResponse } from "next/server";
import { getBasicAuthHeader, getSpringBaseUrl } from "@/lib/spring";

export async function GET() {
    const auth = await getBasicAuthHeader();
    if (!auth) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const res = await fetch(`${getSpringBaseUrl()}/api/inventory/report`, {
        headers: { Authorization: auth },
        cache: "no-store",
    });

    const data = await res.json().catch(() => null);
    return NextResponse.json(data, { status: res.status });
}