import { NextResponse } from "next/server";
import { getBasicAuthHeader, getSpringBaseUrl } from "@/lib/spring";

export async function POST(req: Request) {
    const auth = await getBasicAuthHeader();
    if (!auth) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const body = await req.json();

    const res = await fetch(`${getSpringBaseUrl()}/api/people/employees`, {
        method: "POST",
        headers: { Authorization: auth, "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => null);
    return NextResponse.json(data, { status: res.status });
}