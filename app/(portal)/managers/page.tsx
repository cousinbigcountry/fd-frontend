"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
    type: string; // EMPLOYEE | CLIENT
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
    roleOrCompany: string | null; // department for employees
};

type ReportResponse<T> = {
    title: string;
    generatedAt: string;
    rows: T[];
};

export default function ManagersPage() {
    const [people, setPeople] = useState<PersonResponse[]>([]);
    const [departments, setDepartments] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    const [q, setQ] = useState("");

    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<PersonResponse | null>(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState<string>("");
    const [formErr, setFormErr] = useState<string | null>(null);

    const [reportOpen, setReportOpen] = useState(false);
    const [reportLoading, setReportLoading] = useState(false);
    const [reportErr, setReportErr] = useState<string | null>(null);
    const [report, setReport] = useState<ReportResponse<PersonReportRow> | null>(null);

    const employees = useMemo(() => people.filter((p) => p.type === "EMPLOYEE"), [people]);
    const filteredDepartments = departments.filter((d) => d !== "CLIENT");

    async function loadPeople(query?: string) {
        setLoading(true);
        setErr(null);
        try {
            const url = query ? `/api/people?q=${encodeURIComponent(query)}` : "/api/people";
            const res = await fetch(url, { cache: "no-store" });
            const data = await res.json().catch(() => null);
            if (!res.ok) throw new Error(data?.message ?? data?.error ?? "Failed to load employees");
            setPeople(Array.isArray(data) ? data : []);
        } catch (e: any) {
            setErr(e?.message ?? "Failed to load employees");
        } finally {
            setLoading(false);
        }
    }

    async function loadDepartments() {
        try {
            const res = await fetch("/api/meta/departments", { cache: "no-store" });
            const data = await res.json().catch(() => null);
            if (res.ok && Array.isArray(data)) setDepartments(data);
        } catch {
            // ignore
        }
    }

    useEffect(() => {
        loadPeople();
        loadDepartments();
    }, []);

    function resetForm() {
        setEditing(null);
        setFirstName("");
        setLastName("");
        setEmail("");
        setDepartment("");
        setFormErr(null);
    }

    async function hydrateDepartmentFromReport(personId: number) {
        try {
            const res = await fetch("/api/people/report", { cache: "no-store" });
            const data = await res.json().catch(() => null);
            if (!res.ok) return;
            const rows: PersonReportRow[] = Array.isArray(data?.rows) ? data.rows : [];
            const row = rows.find((r) => r.id === personId && r.type === "EMPLOYEE");
            if (row?.roleOrCompany) setDepartment(String(row.roleOrCompany).trim().toUpperCase());
        } catch {
            // ignore
        }
    }

    function openAdd() {
        resetForm();
        // default department on add, if available
        if (departments.length > 0) setDepartment(departments[0]);
        setOpen(true);
    }

    async function openEdit(p: PersonResponse) {
        setEditing(p);
        setFirstName(p.firstName ?? "");
        setLastName(p.lastName ?? "");
        setEmail(p.email ?? "");
        setDepartment(""); // will hydrate
        setFormErr(null);
        setOpen(true);

        await hydrateDepartmentFromReport(p.id);

        // fallback if report hydrate fails
        setTimeout(() => {
            setDepartment((curr) => {
                if (curr && curr.trim()) return curr;
                return departments.length > 0 ? departments[0] : "";
            });
        }, 0);
    }

    async function saveEmployee() {
        setFormErr(null);

        if (!firstName.trim() || !lastName.trim() || !email.trim()) {
            setFormErr("First name, last name, and email are required.");
            return;
        }

        if (!department.trim()) {
            setFormErr("Department is required.");
            return;
        }

        const payload = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            department: department.trim().toUpperCase(),
        };

        try {
            const url = editing ? `/api/people/employees/${editing.id}` : "/api/people/employees";
            const method = editing ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json().catch(() => null);
            if (!res.ok) throw new Error(data?.message ?? data?.error ?? "Save failed");

            setOpen(false);
            resetForm();
            await loadPeople(q.trim() || undefined);
        } catch (e: any) {
            setFormErr(e?.message ?? "Save failed");
        }
    }

    async function delEmployee(p: PersonResponse) {
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

    const reportEmployeeRows = useMemo(() => {
        const rows = report?.rows ?? [];
        return rows.filter((r) => r.type === "EMPLOYEE");
    }, [report]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Management</h1>
                    {loading && <p className="text-sm text-white/60">Loading…</p>}
                    {err && <p className="text-sm text-red-500">{err}</p>}
                </div>

                <div className="flex gap-2">
                    <Dialog
                        open={open}
                        onOpenChange={(v) => {
                            setOpen(v);
                            if (!v) resetForm();
                        }}
                    >
                        <DialogTrigger asChild>
                            <Button className="bg-white text-black hover:bg-white/90" onClick={openAdd}>
                                Add Employee
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="bg-zinc-950 text-white border-white/10">
                            <DialogHeader>
                                <DialogTitle>{editing ? "Edit Employee" : "Add Employee"}</DialogTitle>
                            </DialogHeader>

                            <div className="grid gap-3">
                                <Input
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="First name"
                                    className="bg-white/5 border-white/10"
                                />
                                <Input
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Last name"
                                    className="bg-white/5 border-white/10"
                                />
                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    className="bg-white/5 border-white/10"
                                />

                                <Select value={department} onValueChange={setDepartment}>
                                    <SelectTrigger className="bg-white/5 border-white/10">
                                        <SelectValue placeholder="Department" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-950 text-white border-white/10">
                                        {filteredDepartments.map((d) => (
                                            <SelectItem key={d} value={d}>
                                                {d}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {formErr && <p className="text-sm text-red-500">{formErr}</p>}

                                <div className="flex justify-end gap-2 pt-2">
                                    <Button
                                        variant="secondary"
                                        className="bg-white/10 text-white hover:bg-white/15"
                                        onClick={() => setOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button className="bg-white text-black hover:bg-white/90" onClick={saveEmployee}>
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
                                <DialogTitle>Employee Report</DialogTitle>
                            </DialogHeader>

                            {reportLoading && <p className="text-sm text-white/60">Generating…</p>}
                            {reportErr && <p className="text-sm text-red-500">{reportErr}</p>}

                            {report && (
                                <div className="space-y-3">
                                    <div className="text-sm">
                                        <p className="font-medium">{report.title}</p>
                                        <p className="text-white/60">
                                            Generated: {new Date(report.generatedAt).toLocaleString()}
                                        </p>
                                    </div>

                                    <div className="max-h-[45vh] overflow-auto rounded-lg border border-white/10">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="text-white/70">Code</TableHead>
                                                    <TableHead className="text-white/70">Name</TableHead>
                                                    <TableHead className="text-white/70">Email</TableHead>
                                                    <TableHead className="text-white/70">Department</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {reportEmployeeRows.map((r) => (
                                                    <TableRow key={r.id} className="border-white/10">
                                                        <TableCell className="text-white/90">{r.code ?? ""}</TableCell>
                                                        <TableCell className="text-white/90">
                                                            {r.firstName} {r.lastName}
                                                        </TableCell>
                                                        <TableCell className="text-white/90">{r.email}</TableCell>
                                                        <TableCell className="text-white/90">{r.roleOrCompany ?? ""}</TableCell>
                                                    </TableRow>
                                                ))}
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
                    <CardTitle className="text-base">Employees</CardTitle>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search by last name or email…"
                            className="bg-white/5 border-white/10 text-white"
                        />
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
                                <TableHead className="text-white/70">Status</TableHead>
                                <TableHead className="text-right text-white/70">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {employees.map((e) => (
                                <TableRow key={e.id} className="border-white/10">
                                    <TableCell className="text-white/90">{e.code ?? ""}</TableCell>
                                    <TableCell className="text-white/90">
                                        {e.firstName} {e.lastName}
                                    </TableCell>
                                    <TableCell className="text-white/90">{e.email}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="bg-white/10 text-white/80 border border-white/10">
                                            Active
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                className="bg-white/10 text-white hover:bg-white/15"
                                                onClick={() => openEdit(e)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                className="bg-red-600/80 hover:bg-red-600"
                                                onClick={() => delEmployee(e)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {!loading && employees.length === 0 && (
                                <TableRow className="border-white/10">
                                    <TableCell colSpan={5} className="text-center text-white/60 py-10">
                                        No employees found.
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