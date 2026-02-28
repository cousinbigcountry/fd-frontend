export type InventoryItem = {
    id: string
    name: string
    sku: string
    quantity: number
    location: string
    status: "In Stock" | "Low" | "Out"
}

export type Assignment = {
    id: string
    title: string
    assignee: string
    due: string
    status: "Open" | "In Progress" | "Done"
    priority: "Low" | "Medium" | "High"
}

export type Client = {
    id: string
    name: string
    industry: string
    email: string
    phone: string
    stage: "Lead" | "Active" | "At Risk" | "Closed"
    notes: string
}

export type Employee = {
    id: string
    name: string
    email: string
    role: "Employee" | "Manager" | "Admin"
    department: string
    status: "Active" | "Inactive"
}