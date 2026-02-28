import { cookies } from "next/headers";

export async function getBasicAuthHeader() {
    const cookieStore = await cookies();
    const token = cookieStore.get("fd_basic")?.value;

    if (!token) return null;
    return `Basic ${token}`;
}

export function getSpringBaseUrl() {
    return process.env.INTERNAL_API_BASE_URL ?? "http://localhost:8080";
}