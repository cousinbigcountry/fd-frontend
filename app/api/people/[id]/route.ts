import { NextResponse } from "next/server";
import { getBasicAuthHeader, getSpringBaseUrl } from "@/lib/spring";

export async function DELETE(
    _req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const auth = await getBasicAuthHeader();
    if (!auth) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { id } = await context.params;

    const res = await fetch(`${getSpringBaseUrl()}/api/people/${id}`, {
        method: "DELETE",
        headers: { Authorization: auth },
    });

    if (res.ok) return NextResponse.json({ ok: true }, { status: 200 });

    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
        const data = await res.json().catch(() => ({}));
        return NextResponse.json(data, { status: res.status });
    }

    const text = await res.text().catch(() => "");
    return NextResponse.json({ error: text || "Delete failed" }, { status: res.status });
}