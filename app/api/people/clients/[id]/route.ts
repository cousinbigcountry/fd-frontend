import { NextResponse } from "next/server";
import { getBasicAuthHeader, getSpringBaseUrl } from "@/lib/spring";

export async function PUT(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const auth = await getBasicAuthHeader();
    if (!auth) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { id } = await context.params;
    const body = await req.json();

    const res = await fetch(`${getSpringBaseUrl()}/api/people/clients/${id}`, {
        method: "PUT",
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
        res.ok ? { ok: true } : { error: text || "Update failed" },
        { status: res.ok ? 200 : res.status }
    );
}