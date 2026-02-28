import { NextResponse } from "next/server";
import { getBasicAuthHeader, getSpringBaseUrl } from "@/lib/spring";

export async function POST(req: Request) {
    const auth = await getBasicAuthHeader();
    if (!auth) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const body = await req.json();

    const res = await fetch(`${getSpringBaseUrl()}/api/people/clients`, {
        method: "POST",
        headers: {
            Authorization: auth,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(body),
    });

    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
        const data = await res.json().catch(() => ({}));
        return NextResponse.json(data, { status: res.status });
    }

    const text = await res.text().catch(() => "");
    return NextResponse.json(
        res.ok ? { ok: true } : { error: text || "Create failed" },
        { status: res.ok ? 200 : res.status }
    );
}