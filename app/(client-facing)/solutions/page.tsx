import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Sparkles } from "lucide-react";

type Package = {
    name: string;
    price: string;
    bestFor: string;
    highlights: string[];
    deliverables: string[];
    cta: string;
    featured?: boolean;
};

type SolutionCategory = {
    key: string;
    title: string;
    subtitle: string;
    bullets: string[];
    packages: Package[];
};

const solutions: SolutionCategory[] = [
    {
        key: "web",
        title: "Web Presence & Lead Gen",
        subtitle: "High-converting websites that look sharp, load fast, and generate leads.",
        bullets: [
            "Custom-coded Next.js sites",
            "SEO + performance tuned",
            "Mobile-first UI and conversion-focused layouts",
        ],
        packages: [
            {
                name: "Launch",
                price: "$1,499+",
                bestFor: "New businesses needing a strong first impression",
                highlights: ["1–3 page site", "Contact/lead form", "Basic SEO setup"],
                deliverables: [
                    "Hero + CTA section",
                    "Services/overview section",
                    "Contact form to email",
                    "On-page SEO (titles/meta)",
                    "Mobile responsive layout",
                ],
                cta: "Book a Launch Call",
            },
            {
                name: "Growth",
                price: "$3,499+",
                bestFor: "Businesses ready to scale leads and content",
                highlights: ["Up to 7 pages", "Blog or resources", "Advanced SEO + analytics"],
                deliverables: [
                    "Up to 7 pages (Home, Solutions, About, Contact + more)",
                    "Blog/resources (optional)",
                    "GA4 + basic event tracking",
                    "Speed + accessibility pass",
                    "CTA optimization and section-level copy guidance",
                ],
                cta: "Get a Growth Quote",
                featured: true,
            },
            {
                name: "Scale",
                price: "$6,999+",
                bestFor: "Brands needing custom features + ongoing iteration",
                highlights: ["Custom components", "Integrations", "A/B-ready layouts"],
                deliverables: [
                    "Design system starter (reusable sections)",
                    "Integrations (CRM, email, forms)",
                    "Landing pages for campaigns",
                    "Conversion-focused UX review",
                    "Priority support window (optional)",
                ],
                cta: "Talk to Sales",
            },
        ],
    },
    {
        key: "crm",
        title: "Business Suite (CRM / Portal)",
        subtitle: "A secure internal portal to manage customers, work, and operations.",
        bullets: [
            "Auth + roles (employee portal)",
            "Customer + pipeline tracking",
            "Reports & dashboards",
        ],
        packages: [
            {
                name: "Starter CRM",
                price: "$4,999+",
                bestFor: "Teams that need basic pipeline + customer tracking",
                highlights: ["Contacts & companies", "Deal stages", "Activity notes"],
                deliverables: [
                    "Login + role-based access",
                    "Contacts/Companies module",
                    "Deals/Pipeline board",
                    "Notes + task tracking",
                    "Export-ready report view",
                ],
                cta: "Scope Starter CRM",
            },
            {
                name: "Operations CRM",
                price: "$9,999+",
                bestFor: "Teams needing automation + deeper reporting",
                highlights: ["Custom fields", "Email templates", "Advanced reports"],
                deliverables: [
                    "Custom fields & statuses",
                    "Automations (basic workflows)",
                    "Email templates + logging",
                    "Advanced reports with timestamps",
                    "Audit-friendly change tracking (lightweight)",
                ],
                cta: "Plan Operations CRM",
                featured: true,
            },
            {
                name: "Enterprise Portal",
                price: "Custom",
                bestFor: "Multi-role organizations with multiple modules",
                highlights: ["Multi-tenant ready", "SSO options", "Modular architecture"],
                deliverables: [
                    "Modular system design (CRM + add-ons)",
                    "Multi-tenant architecture options",
                    "SSO integration (as needed)",
                    "Security review checklist",
                    "Performance + scaling strategy",
                ],
                cta: "Request Enterprise Consult",
            },
        ],
    },
    {
        key: "it",
        title: "IT & Digital Ops",
        subtitle: "Reliable support, security hardening, and systems that stay maintained.",
        bullets: [
            "Security-first mindset",
            "Standardized documentation",
            "Monitoring + maintenance options",
        ],
        packages: [
            {
                name: "Foundation",
                price: "$299/mo",
                bestFor: "Small teams needing a dependable baseline",
                highlights: ["Monthly check-in", "Patch guidance", "Documentation"],
                deliverables: [
                    "Monthly systems review",
                    "Patch/update guidance",
                    "Password policy + MFA guidance",
                    "Simple network diagram (if applicable)",
                    "Runbook documentation starter",
                ],
                cta: "Start Foundation",
            },
            {
                name: "Secure+",
                price: "$699/mo",
                bestFor: "Businesses prioritizing security + uptime",
                highlights: ["Security hardening", "Monitoring", "Incident playbooks"],
                deliverables: [
                    "Baseline hardening checklist",
                    "Monitoring recommendations + setup",
                    "Phishing awareness starter kit",
                    "Backup strategy review",
                    "Incident response playbook (lite)",
                ],
                cta: "Upgrade to Secure+",
                featured: true,
            },
            {
                name: "Ops Partner",
                price: "Custom",
                bestFor: "Organizations needing ongoing ops + roadmap support",
                highlights: ["SLA options", "Vendor management", "Quarterly roadmap"],
                deliverables: [
                    "SLA support options",
                    "Vendor/tooling evaluation",
                    "Quarterly roadmap planning",
                    "Change management process",
                    "Ongoing optimization & reporting",
                ],
                cta: "Talk Ops Partnership",
            },
        ],
    },
];

function FeatureList({ items }: { items: string[] }) {
    return (
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {items.map((t) => (
                <li key={t} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-white" />
                    <span className="text-foreground/80">{t}</span>
                </li>
            ))}
        </ul>
    );
}

function PackageCard({ pkg }: { pkg: Package }) {
    return (
        <Card
            className={[
                "h-full bg-white/50 backdrop-blur border-white/10",
                pkg.featured ? "ring-1 ring-white/25 shadow-[0_0_0_1px_rgba(255,255,255,0.10)]" : "",
            ].join(" ")}
        >
            <CardHeader className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-white">{pkg.name}</CardTitle>
                    {pkg.featured ? (
                        <Badge className="bg-white text-black hover:bg-white/90">
                            <Sparkles className="mr-1 h-3.5 w-3.5" />
                            Most Popular
                        </Badge>
                    ) : (
                        <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/15">
                            Package
                        </Badge>
                    )}
                </div>
                <CardDescription className="text-white/70">{pkg.bestFor}</CardDescription>
                <div className="pt-2">
                    <div className="text-3xl font-semibold text-white">{pkg.price}</div>
                    <div className="text-xs text-white/60">Starting price • final quote based on scope</div>
                </div>
            </CardHeader>

            <CardContent>
                <Separator className="bg-white/10" />
                <div className="mt-4">
                    <div className="text-sm font-medium text-white">Highlights</div>
                    <FeatureList items={pkg.highlights} />
                </div>

                <div className="mt-6">
                    <div className="text-sm font-medium text-white">Deliverables</div>
                    <FeatureList items={pkg.deliverables}/>
                </div>
            </CardContent>

            <CardFooter className="mt-auto">
                <Button
                    className={[
                        "w-full",
                        pkg.featured ? "bg-white text-black hover:bg-white/90" : "bg-white/10 text-white hover:bg-white/15",
                    ].join(" ")}
                >
                    {pkg.cta}
                </Button>
            </CardFooter>
        </Card>
    );
}

export default function SolutionsPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            {/* Top hero */}
            <section className="border-b border-white/10">
                <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
                    <div className="flex flex-col gap-6">
                        <Badge variant="secondary" className="w-fit bg-white/10 text-white hover:bg-white/15">
                            Fountline Digital • Solutions
                        </Badge>

                        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                            Packages built to launch fast, scale clean, and run reliably.
                        </h1>

                        <p className="max-w-2xl text-white/70">
                            Choose a package that matches where you are now—then upgrade as your business grows. Every plan is mobile-first,
                            performance-minded, and designed to be maintainable.
                        </p>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Button className="bg-white text-black hover:bg-white/90">Get a Quote</Button>
                            <Button variant="secondary" className="bg-white/10 text-white hover:bg-white/15">
                                See What’s Included
                            </Button>
                        </div>

                        <div className="grid gap-3 pt-6 sm:grid-cols-3">
                            {[
                                { title: "Fast Launch", desc: "Clear scope, clean builds, quick turnaround." },
                                { title: "Scalable Design", desc: "Modular structure that grows with you." },
                                { title: "Security Mindset", desc: "Best practices baked into every deliverable." },
                            ].map((x) => (
                                <div key={x.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
                                    <div className="text-sm font-medium">{x.title}</div>
                                    <div className="mt-1 text-sm text-white/70">{x.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Tabs for the three solution types */}
            <section>
                <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
                    <Tabs defaultValue={solutions[0].key} className="w-full">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <h2 className="text-2xl font-semibold">Explore Solutions</h2>
                                <p className="mt-1 text-sm text-white/70">
                                    Three tracks. Three packages each. Pick a lane—or mix and match.
                                </p>
                            </div>

                            <TabsList className="h-auto w-full justify-start bg-white/5 p-1 sm:w-auto border border-white">
                                {solutions.map((s) => (
                                    <TabsTrigger
                                        key={s.key}
                                        value={s.key}
                                        className="data-[state=active]:bg-white data-[state=active]:text-black"
                                    >
                                        {s.title}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>

                        {solutions.map((s) => (
                            <TabsContent key={s.key} value={s.key} className="mt-8">
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <h3 className="text-xl font-semibold">{s.title}</h3>
                                            <p className="mt-1 text-sm text-white/70">{s.subtitle}</p>
                                        </div>
                                        <Button variant="secondary" className="bg-white/10 text-white hover:bg-white/15">
                                            Discuss This Track
                                        </Button>
                                    </div>

                                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                                        {s.bullets.map((b) => (
                                            <div key={b} className="rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-white/80">
                                                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-white/70 align-middle" />
                                                {b}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-8 grid gap-6 md:grid-cols-3">
                                    {s.packages.map((pkg) => (
                                        <PackageCard key={pkg.name} pkg={pkg} />
                                    ))}
                                </div>

                                <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <div className="text-lg font-semibold">Not sure which package fits?</div>
                                            <div className="mt-1 text-sm text-white/70">
                                                Tell us your goals and timeline—Fountline Digital will recommend the best starting point.
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-3 sm:flex-row">
                                            <Button className="bg-white text-black hover:bg-white/90">Schedule a Call</Button>
                                            <Button variant="secondary" className="bg-white/10 text-white hover:bg-white/15">
                                                Email Us
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="border-t border-white/10">
                <div className="mx-auto max-w-6xl px-4 py-12">
                    <div className="grid gap-6 rounded-2xl border border-white/10 bg-white/5 p-8 sm:grid-cols-3 sm:items-center">
                        <div className="sm:col-span-2">
                            <h3 className="text-2xl font-semibold">Ready to build with Fountline Digital?</h3>
                            <p className="mt-2 text-white/70">
                                Clean design. Solid engineering. Practical packages that move your business forward.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 sm:items-end">
                            <Button className="w-full bg-white text-black hover:bg-white/90 sm:w-auto">Get Started</Button>
                            <Button variant="secondary" className="w-full bg-white/10 text-white hover:bg-white/15 sm:w-auto">
                                View Sample Work
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}