"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

type PersonResponse = {
    id: number;
    type: string; // CLIENT | EMPLOYEE
    code: string | null;
    firstName: string;
    lastName: string;
    email: string;
};

type PersonReportRow = {
    id: number;
    type: string;
    code: string | null;
    firstName: string;
    lastName: string;
    email: string;
    roleOrCompany: string | null;
};

type ReportResponse<T> = {
    title: string;
    generatedAt: string;
    rows: T[];
};

export default function CrmPage() {
    const [people, setPeople] = useState<PersonResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    const [q, setQ] = useState("");

    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<PersonResponse | null>(null);

    // form state
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [formErr, setFormErr] = useState<string | null>(null);

    // report dialog
    const [reportOpen, setReportOpen] = useState(false);
    const [reportLoading, setReportLoading] = useState(false);
    const [reportErr, setReportErr] = useState<string | null>(null);
    const [report, setReport] = useState<ReportResponse<PersonReportRow> | null>(null);

    const clients = useMemo(() => people.filter((p) => p.type === "CLIENT"), [people]);

    async function loadPeople(query?: string) {
        setLoading(true);
        setErr(null);
        try {
            const url = query ? `/api/people?q=${encodeURIComponent(query)}` : "/api/people";
            const res = await fetch(url, { cache: "no-store" });
            const data = await res.json().catch(() => null);
            if (!res.ok) throw new Error(data?.message ?? data?.error ?? "Failed to load CRM");
            setPeople(Array.isArray(data) ? data : []);
        } catch (e: any) {
            setErr(e?.message ?? "Failed to load CRM");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadPeople();
    }, []);

    function resetForm() {
        setFirstName("");
        setLastName("");
        setEmail("");
        setCompanyName("");
        setFormErr(null);
    }

    async function hydrateCompanyNameFromReport(personId: number) {
        try {
            const res = await fetch("/api/people/report", { cache: "no-store" });
            const data = await res.json().catch(() => null);
            if (!res.ok) return;
            const rows: PersonReportRow[] = Array.isArray(data?.rows) ? data.rows : [];
            const row = rows.find((r) => r.id === personId && r.type === "CLIENT");
            if (row?.roleOrCompany) setCompanyName(row.roleOrCompany);
        } catch {
            // ignore
        }
    }

    function openAdd() {
        setEditing(null);
        resetForm();
        setOpen(true);
    }

    async function openEdit(p: PersonResponse) {
        setEditing(p);
        setFirstName(p.firstName ?? "");
        setLastName(p.lastName ?? "");
        setEmail(p.email ?? "");
        setCompanyName("");
        setFormErr(null);
        setOpen(true);

        await hydrateCompanyNameFromReport(p.id);
    }

    async function save() {
        setFormErr(null);

        if (!firstName.trim() || !lastName.trim() || !email.trim() || !companyName.trim()) {
            setFormErr("First name, last name, email, and company name are required.");
            return;
        }

        const payload = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            companyName: companyName.trim(),
            department: "CLIENT",
        };

        try {
            const res = await fetch(
                editing ? `/api/people/clients/${editing.id}` : "/api/people/clients",
                {
                    method: editing ? "PUT" : "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );

            const data = await res.json().catch(() => null);
            if (!res.ok) throw new Error(data?.message ?? data?.error ?? "Save failed");

            setOpen(false);
            await loadPeople(q.trim() || undefined);
        } catch (e: any) {
            setFormErr(e?.message ?? "Save failed");
        }
    }

    async function del(p: PersonResponse) {
        setErr(null);
        try {
            const res = await fetch(`/api/people/${p.id}`, { method: "DELETE" });
            const data = await res.json().catch(() => null);
            if (!res.ok) throw new Error(data?.message ?? data?.error ?? "Delete failed");
            await loadPeople(q.trim() || undefined);
        } catch (e: any) {
            setErr(e?.message ?? "Delete failed");
        }
    }

    async function runSearch() {
        await loadPeople(q.trim() || undefined);
    }

    async function loadReport() {
        setReportLoading(true);
        setReportErr(null);
        try {
            const res = await fetch("/api/people/report", { cache: "no-store" });
            const data = await res.json().catch(() => null);
            if (!res.ok) throw new Error(data?.message ?? data?.error ?? "Report failed");
            setReport(data);
        } catch (e: any) {
            setReportErr(e?.message ?? "Report failed");
            setReport(null);
        } finally {
            setReportLoading(false);
        }
    }

    const reportClientRows = useMemo(() => {
        const rows = report?.rows ?? [];
        return rows.filter((r) => r.type === "CLIENT");
    }, [report]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">CRM</h1>
                    {loading && <p className="text-sm text-white/60">Loading…</p>}
                    {err && <p className="text-sm text-red-500">{err}</p>}
                </div>

                <div className="flex gap-2">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-white text-black hover:bg-white/90" onClick={openAdd}>
                                Add Client
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="bg-zinc-950 text-white border-white/10">
                            <DialogHeader>
                                <DialogTitle>{editing ? "Edit Client" : "Add Client"}</DialogTitle>
                            </DialogHeader>

                            <div className="grid gap-3">
                                <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" className="bg-white/5 border-white/10" />
                                <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" className="bg-white/5 border-white/10" />
                                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="bg-white/5 border-white/10" />
                                <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company name" className="bg-white/5 border-white/10" />

                                {formErr && <p className="text-sm text-red-500">{formErr}</p>}

                                <div className="flex justify-end gap-2 pt-2">
                                    <Button variant="secondary" className="bg-white/10 text-white hover:bg-white/15" onClick={() => setOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button className="bg-white text-black hover:bg-white/90" onClick={save}>
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Dialog
                        open={reportOpen}
                        onOpenChange={(v) => {
                            setReportOpen(v);
                            if (v) loadReport();
                        }}
                    >
                        <DialogTrigger asChild>
                            <Button variant="secondary" className="bg-white/10 text-white hover:bg-white/15">
                                Generate Report
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="bg-zinc-950 text-white border-white/10 max-w-3xl">
                            <DialogHeader>
                                <DialogTitle>CRM Report</DialogTitle>
                            </DialogHeader>

                            {reportLoading && <p className="text-sm text-white/60">Generating…</p>}
                            {reportErr && <p className="text-sm text-red-500">{reportErr}</p>}

                            {report && (
                                <div className="space-y-3">
                                    <div className="text-sm">
                                        <p className="font-medium">{report.title}</p>
                                        <p className="text-white/60">Generated: {new Date(report.generatedAt).toLocaleString()}</p>
                                    </div>

                                    <div className="max-h-[45vh] overflow-auto rounded-lg border border-white/10">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="text-white/70">Code</TableHead>
                                                    <TableHead className="text-white/70">Name</TableHead>
                                                    <TableHead className="text-white/70">Email</TableHead>
                                                    <TableHead className="text-white/70">Company</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {reportClientRows.map((r) => (
                                                    <TableRow key={r.id} className="border-white/10">
                                                        <TableCell className="text-white/90">{r.code ?? ""}</TableCell>
                                                        <TableCell className="text-white/90">{r.firstName} {r.lastName}</TableCell>
                                                        <TableCell className="text-white/90">{r.email}</TableCell>
                                                        <TableCell className="text-white/90">{r.roleOrCompany ?? ""}</TableCell>
                                                    </TableRow>
                                                ))}
                                                {reportClientRows.length === 0 && (
                                                    <TableRow className="border-white/10">
                                                        <TableCell colSpan={4} className="text-center text-white/60 py-10">
                                                            No clients found.
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>

                                    <div className="flex justify-end">
                                        <Button className="bg-white text-black hover:bg-white/90" onClick={() => setReportOpen(false)}>
                                            Close
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <Card className="bg-white/5 border-white/10">
                <CardHeader className="space-y-3">
                    <CardTitle className="text-base">Clients</CardTitle>

                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by last name or email…" className="bg-white/5 border-white/10 text-white" />
                        <Button onClick={runSearch} className="bg-white text-black hover:bg-white/90">
                            Search
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="overflow-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/10">
                                <TableHead className="text-white/70">Code</TableHead>
                                <TableHead className="text-white/70">Name</TableHead>
                                <TableHead className="text-white/70">Email</TableHead>
                                <TableHead className="text-right text-white/70">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {clients.map((c) => (
                                <TableRow key={c.id} className="border-white/10">
                                    <TableCell className="text-white/90">{c.code ?? ""}</TableCell>
                                    <TableCell className="text-white/90">{c.firstName} {c.lastName}</TableCell>
                                    <TableCell className="text-white/90">{c.email}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button size="sm" variant="secondary" className="bg-white/10 text-white hover:bg-white/15" onClick={() => openEdit(c)}>
                                                Edit
                                            </Button>
                                            <Button size="sm" variant="destructive" className="bg-red-600/80 hover:bg-red-600" onClick={() => del(c)}>
                                                Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {!loading && clients.length === 0 && (
                                <TableRow className="border-white/10">
                                    <TableCell colSpan={4} className="text-center text-white/60 py-10">
                                        No clients found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}