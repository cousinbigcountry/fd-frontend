import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
    ArrowRight,
    ShieldCheck,
    Zap,
    Code2,
    BarChart3,
    Boxes,
    CheckCircle2,
} from "lucide-react"

export default function HomePage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* HERO */}
            <section className="relative overflow-hidden">

                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute left-1/2 top-[-120px] h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-foreground/5 blur-3xl" />
                    <div className="absolute bottom-[-140px] right-[-120px] h-[360px] w-[360px] rounded-full bg-foreground/5 blur-3xl" />
                </div>

                <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
                    <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
                        <div className="lg:col-span-7">
                            <div className="flex flex-wrap items-center gap-2">
                                <Badge variant="secondary" className="rounded-full">
                                    Greenville-based • Remote-friendly
                                </Badge>
                                <Badge variant="outline" className="rounded-full">
                                    Web • Mobile • IT Solutions
                                </Badge>
                            </div>

                            <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">
                                Custom software and websites that{" "}
                                <span className="text-foreground/70">scale with your business</span>.
                            </h1>

                            <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/70 sm:text-lg">
                                Fountline Digital builds modern, custom-coded websites, internal tools,
                                and modular business suites (CRM, inventory, reporting) — secure by design,
                                fast to ship, and easy to grow.
                            </p>

                            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                                <Button asChild size="lg" className="rounded-2xl">
                                    <Link href="#contact">
                                        Get a Free Build Plan <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>

                                <Button asChild size="lg" variant="outline" className="rounded-2xl">
                                    <Link href="#services">View Services</Link>
                                </Button>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-3 text-sm text-foreground/70">
                                <div className="inline-flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4" />
                                    Secure by design
                                </div>
                                <div className="inline-flex items-center gap-2">
                                    <Zap className="h-4 w-4" />
                                    Performance-first
                                </div>
                                <div className="inline-flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4" />
                                    Transparent timelines
                                </div>
                            </div>
                        </div>


                        <div className="lg:col-span-5">
                            <Card className="rounded-3xl">
                                <CardHeader>
                                    <CardTitle className="text-xl">What you get</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 rounded-xl border p-2">
                                            <Code2 className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Custom-coded builds</p>
                                            <p className="text-sm text-foreground/70">
                                                Clean architecture, maintainable code, and room to expand.
                                            </p>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 rounded-xl border p-2">
                                            <BarChart3 className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Reporting + insights</p>
                                            <p className="text-sm text-foreground/70">
                                                Dashboards and reports with timestamps, exports, and KPIs.
                                            </p>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 rounded-xl border p-2">
                                            <Boxes className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Modular growth</p>
                                            <p className="text-sm text-foreground/70">
                                                Start with a site. Add CRM, inventory, and automation later.
                                            </p>
                                        </div>
                                    </div>

                                    <Button asChild className="mt-2 w-full rounded-2xl" variant="secondary">
                                        <Link href="#packages">See starter packages</Link>
                                    </Button>

                                    <p className="text-xs text-foreground/60">
                                        Typical turnaround: a clear plan in 24–48 hours after discovery.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>


            <section id="services" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Services</h2>
                        <p className="mt-2 max-w-2xl text-foreground/70">
                            Practical builds that improve your online presence, streamline operations,
                            and support growth.
                        </p>
                    </div>
                    <Badge variant="outline" className="hidden sm:inline-flex rounded-full">
                        Built with modern stacks (Next.js, APIs, databases)
                    </Badge>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Card className="rounded-3xl">
                        <CardHeader>
                            <CardTitle className="text-lg">Custom Websites</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-foreground/70">
                            Fast, mobile-friendly, SEO-ready sites with clean design and clear CTAs.
                        </CardContent>
                    </Card>

                    <Card className="rounded-3xl">
                        <CardHeader>
                            <CardTitle className="text-lg">Business Tools (CRM)</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-foreground/70">
                            Track leads, customers, tasks, and follow-ups with role-based access.
                        </CardContent>
                    </Card>

                    <Card className="rounded-3xl">
                        <CardHeader>
                            <CardTitle className="text-lg">Inventory + Ops</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-foreground/70">
                            Items, vendors, pricing history, and simple reporting—built for clarity.
                        </CardContent>
                    </Card>

                    <Card className="rounded-3xl">
                        <CardHeader>
                            <CardTitle className="text-lg">Automation</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-foreground/70">
                            Reduce manual work with integrations, alerts, and workflow improvements.
                        </CardContent>
                    </Card>

                    <Card className="rounded-3xl">
                        <CardHeader>
                            <CardTitle className="text-lg">IT & Support</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-foreground/70">
                            Practical help with setup, security basics, and keeping systems running.
                        </CardContent>
                    </Card>

                    <Card className="rounded-3xl">
                        <CardHeader>
                            <CardTitle className="text-lg">Performance + Security</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-foreground/70">
                            Best practices that keep your site fast, stable, and safer by default.
                        </CardContent>
                    </Card>
                </div>
            </section>


            <section className="mx-auto max-w-6xl px-4 pb-14 sm:pb-20">
                <Card className="rounded-3xl">
                    <CardHeader>
                        <CardTitle className="text-xl">How it works</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6 lg:grid-cols-3">
                        <div>
                            <p className="text-sm font-medium">1) Discovery</p>
                            <p className="mt-1 text-sm text-foreground/70">
                                We map goals, users, and your “must-haves” (plus what can wait).
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">2) Build Plan</p>
                            <p className="mt-1 text-sm text-foreground/70">
                                You get a clear scope, timeline, and recommendations—no guesswork.
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">3) Ship + Support</p>
                            <p className="mt-1 text-sm text-foreground/70">
                                Launch fast, then iterate. Add modules like CRM or inventory when ready.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </section>


            <section id="contact" className="mx-auto max-w-6xl px-4 pb-16">
                <div className="rounded-3xl border p-6 sm:p-10">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h3 className="text-2xl font-semibold tracking-tight">
                                Ready to build something that actually works?
                            </h3>
                            <p className="mt-2 max-w-2xl text-foreground/70">
                                Tell us what you’re trying to achieve and we’ll send a simple build plan:
                                recommended pages/features, timeline, and next steps.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Button size="lg" className="rounded-2xl">
                                Request a Quote
                            </Button>
                            <Button size="lg" variant="outline" className="rounded-2xl">
                                Book a Discovery Call
                            </Button>
                        </div>
                    </div>

                    <Separator className="my-6" />

                    <div className="flex flex-wrap gap-2 text-xs text-foreground/60">
                        <span>• Web Development</span>
                        <span>• CRM/ERP Modules</span>
                        <span>• Inventory Tracking</span>
                        <span>• Automation</span>
                        <span>• IT Support</span>
                    </div>
                </div>
            </section>
        </main>
    )
}