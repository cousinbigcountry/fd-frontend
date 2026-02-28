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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

type InventoryItem = {
    id: number;
    sku: string;
    name: string;
    quantity: number;
    reorderLevel: number;
    updatedAt?: string;
};

type ReportResponse<T> = {
    title: string;
    generatedAt: string;
    rows: T[];
};

function toCsvValue(v: unknown) {
    const s = String(v ?? "");
    if (s.includes(",") || s.includes('"') || s.includes("\n")) {
        return `"${s.replaceAll('"', '""')}"`;
    }
    return s;
}

export default function InventoryPage() {
    const [items, setItems] = useState<InventoryItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    const [q, setQ] = useState("");
    const [filterText, setFilterText] = useState("");

    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<InventoryItem | null>(null);

    // report dialog
    const [reportOpen, setReportOpen] = useState(false);
    const [reportLoading, setReportLoading] = useState(false);
    const [reportErr, setReportErr] = useState<string | null>(null);
    const [report, setReport] = useState<ReportResponse<InventoryItem> | null>(null);

    // form state
    const [sku, setSku] = useState("");
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState<string>("0");
    const [reorderLevel, setReorderLevel] = useState<string>("0");

    async function loadInventory(query?: string) {
        setLoading(true);
        setErr(null);
        try {
            const url = query ? `/api/inventory?q=${encodeURIComponent(query)}` : "/api/inventory";
            const res = await fetch(url, { cache: "no-store" });
            const data = await res.json().catch(() => null);

            if (!res.ok) throw new Error(data?.error ?? "Failed to load inventory");

            setItems(Array.isArray(data) ? data : []);
        } catch (e: any) {
            setErr(e?.message ?? "Failed to load inventory");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadInventory();
    }, []);

    const statusFor = useMemo(() => {
        return (it: InventoryItem) => (it.quantity <= it.reorderLevel ? "Low" : "OK");
    }, []);

    function resetForm() {
        setSku("");
        setName("");
        setQuantity("0");
        setReorderLevel("0");
    }

    function openAdd() {
        setEditing(null);
        resetForm();
        setOpen(true);
    }

    function openEdit(it: InventoryItem) {
        setEditing(it);
        setSku(it.sku ?? "");
        setName(it.name ?? "");
        setQuantity(String(it.quantity ?? 0));
        setReorderLevel(String(it.reorderLevel ?? 0));
        setOpen(true);
    }

    async function save() {
        setErr(null);

        const payload = {
            sku: sku.trim(),
            name: name.trim(),
            quantity: Number(quantity),
            reorderLevel: Number(reorderLevel),
        };

        try {
            const res = await fetch(editing ? `/api/inventory/${editing.id}` : "/api/inventory", {
                method: editing ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json().catch(() => null);
            if (!res.ok) throw new Error(data?.message ?? data?.error ?? "Save failed");

            setOpen(false);
            await loadInventory(filterText || undefined);
        } catch (e: any) {
            setErr(e?.message ?? "Save failed");
        }
    }

    async function del(it: InventoryItem) {
        setErr(null);
        try {
            const res = await fetch(`/api/inventory/${it.id}`, { method: "DELETE" });
            const data = await res.json().catch(() => null);
            if (!res.ok) throw new Error(data?.message ?? data?.error ?? "Delete failed");

            await loadInventory(filterText || undefined);
        } catch (e: any) {
            setErr(e?.message ?? "Delete failed");
        }
    }

    async function runFilter() {
        setFilterText(q.trim());
        await loadInventory(q.trim() || undefined);
    }

    async function loadReport() {
        setReportLoading(true);
        setReportErr(null);
        try {
            const res = await fetch("/api/inventory/report", { cache: "no-store" });
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

    async function exportCsvFromReport() {
        setErr(null);
        try {
            const res = await fetch("/api/inventory/report", { cache: "no-store" });
            const reportData = await res.json().catch(() => null);
            if (!res.ok) throw new Error(reportData?.message ?? reportData?.error ?? "Report failed");

            const rows: any[] = Array.isArray(reportData?.rows) ? reportData.rows : [];
            const header = ["id", "name", "sku", "quantity", "reorderLevel", "updatedAt"];
            const csv =
                header.join(",") +
                "\n" +
                rows.map((r) => header.map((h) => toCsvValue(r?.[h])).join(",")).join("\n");

            const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `inventory-report-${new Date().toISOString().slice(0, 10)}.csv`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (e: any) {
            setErr(e?.message ?? "Export failed");
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Inventory</h1>
                    {loading && <p className="text-sm text-white/60">Loading…</p>}
                    {err && <p className="text-sm text-red-500">{err}</p>}
                </div>

                <div className="flex gap-2">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-white text-black hover:bg-white/90" onClick={openAdd}>
                                Add Item
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="bg-zinc-950 text-white border-white/10">
                            <DialogHeader>
                                <DialogTitle>{editing ? "Edit Inventory Item" : "Add Inventory Item"}</DialogTitle>
                            </DialogHeader>

                            <div className="grid gap-3">
                                <Input value={sku} onChange={(e) => setSku(e.target.value)} placeholder="SKU" className="bg-white/5 border-white/10" />
                                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="bg-white/5 border-white/10" />
                                <Input value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" inputMode="numeric" className="bg-white/5 border-white/10" />
                                <Input value={reorderLevel} onChange={(e) => setReorderLevel(e.target.value)} placeholder="Reorder Level" inputMode="numeric" className="bg-white/5 border-white/10" />

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
                                <DialogTitle>Inventory Report</DialogTitle>
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
                                                    <TableHead className="text-white/70">SKU</TableHead>
                                                    <TableHead className="text-white/70">Name</TableHead>
                                                    <TableHead className="text-white/70">Qty</TableHead>
                                                    <TableHead className="text-white/70">Reorder</TableHead>
                                                    <TableHead className="text-white/70">Updated</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {report.rows.map((it) => (
                                                    <TableRow key={it.id} className="border-white/10">
                                                        <TableCell className="text-white/90">{it.sku}</TableCell>
                                                        <TableCell className="text-white/90">{it.name}</TableCell>
                                                        <TableCell className="text-white/90">{it.quantity}</TableCell>
                                                        <TableCell className="text-white/90">{it.reorderLevel}</TableCell>
                                                        <TableCell className="text-white/80">
                                                            {it.updatedAt ? new Date(it.updatedAt).toLocaleString() : ""}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>

                                    <div className="flex justify-end gap-2">
                                        <Button variant="secondary" className="bg-white/10 text-white hover:bg-white/15" onClick={exportCsvFromReport}>
                                            Download CSV
                                        </Button>
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
                    <CardTitle className="text-base">Items</CardTitle>

                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, SKU…" className="bg-white/5 border-white/10 text-white" />
                        <Button onClick={runFilter} className="bg-white text-black hover:bg-white/90">
                            Search
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="overflow-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/10">
                                <TableHead className="text-white/70">SKU</TableHead>
                                <TableHead className="text-white/70">Name</TableHead>
                                <TableHead className="text-white/70">Qty</TableHead>
                                <TableHead className="text-white/70">Reorder</TableHead>
                                <TableHead className="text-white/70">Status</TableHead>
                                <TableHead className="text-right text-white/70">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {items.map((it) => {
                                const status = statusFor(it);
                                return (
                                    <TableRow key={it.id} className="border-white/10">
                                        <TableCell className="text-white/90">{it.sku}</TableCell>
                                        <TableCell className="text-white/90">{it.name}</TableCell>
                                        <TableCell className="text-white/90">{it.quantity}</TableCell>
                                        <TableCell className="text-white/90">{it.reorderLevel}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="secondary"
                                                className={[
                                                    "border",
                                                    status === "Low"
                                                        ? "bg-red-500/10 text-red-300 border-red-500/20"
                                                        : "bg-white/10 text-white/80 border-white/10",
                                                ].join(" ")}
                                            >
                                                {status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button size="sm" variant="secondary" className="bg-white/10 text-white hover:bg-white/15" onClick={() => openEdit(it)}>
                                                    Edit
                                                </Button>
                                                <Button size="sm" variant="destructive" className="bg-red-600/80 hover:bg-red-600" onClick={() => del(it)}>
                                                    Delete
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}

                            {!loading && items.length === 0 && (
                                <TableRow className="border-white/10">
                                    <TableCell colSpan={6} className="text-center text-white/60 py-10">
                                        No items found.
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