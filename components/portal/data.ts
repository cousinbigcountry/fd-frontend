export type InventoryItem = {
    id: string;
    sku: string;
    name: string;
    quantity: number;
    location: string;
    status: "In Stock" | "Low" | "Out";
};

export type Assignment = {
    id: string;
    title: string;
    assignee: string;
    priority: "Low" | "Medium" | "High";
    status: "Open" | "In Progress" | "Done";
    due: string;
};

export type Client = {
    id: string;
    name: string;
    email: string;
    phone: string;
    stage: "Lead" | "Prospect" | "Active" | "At Risk";
};

export type Employee = {
    id: string;
    name: string;
    email: string;
    role: "Manager" | "Sales" | "Tech" | "Ops";
    status: "Active" | "Inactive";
};

export const inventory: InventoryItem[] = [
    { id: "inv_1", sku: "FD-001", name: "Laptop - Service Pool", quantity: 7, location: "HQ", status: "In Stock" },
    { id: "inv_2", sku: "FD-014", name: "Network Switch", quantity: 2, location: "HQ", status: "Low" },
    { id: "inv_3", sku: "FD-021", name: "Replacement SSD", quantity: 0, location: "Warehouse", status: "Out" },
];

export const assignments: Assignment[] = [
    { id: "as_1", title: "Onboard new client domain + DNS", assignee: "Alex", priority: "High", status: "Open", due: "2026-03-01" },
    { id: "as_2", title: "Inventory audit - Q1", assignee: "Jordan", priority: "Medium", status: "In Progress", due: "2026-03-05" },
    { id: "as_3", title: "Follow up: CRM lead list", assignee: "Taylor", priority: "Low", status: "Done", due: "2026-02-20" },
];

export const clients: Client[] = [
    { id: "c_1001", name: "Ridgeview Auto", email: "ops@ridgeviewauto.com", phone: "(555) 201-1001", stage: "Active" },
    { id: "c_1002", name: "Upstate Dental", email: "admin@upstatedental.com", phone: "(555) 201-1002", stage: "Prospect" },
    { id: "c_1003", name: "Summit Realty", email: "hello@summitrealty.com", phone: "(555) 201-1003", stage: "Lead" },
];

export const employees: Employee[] = [
    { id: "e_1", name: "Casey Morgan", email: "casey@fountline.digital", role: "Manager", status: "Active" },
    { id: "e_2", name: "Avery Quinn", email: "avery@fountline.digital", role: "Tech", status: "Active" },
    { id: "e_3", name: "Riley Stone", email: "riley@fountline.digital", role: "Sales", status: "Inactive" },
];