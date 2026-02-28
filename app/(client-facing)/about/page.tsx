import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { CheckCircle2, Shield, Rocket, Users } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            {/* HERO */}
            <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:py-16">
                <div className="grid gap-8 md:grid-cols-2 md:items-center">
                    <div className="space-y-5">
                        <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/15">
                            About Fountline Digital
                        </Badge>

                        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                            We build modern web experiences that are{" "}
                            <span className="text-white/70">fast, secure, and scalable</span>.
                        </h1>

                        <p className="text-base leading-relaxed text-white/70 sm:text-lg">
                            Fountline Digital helps small businesses and teams level up with custom-coded
                            websites, internal tools, and practical automation—built to grow with you.
                        </p>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Button className="bg-white text-black hover:bg-white/90">
                                <Link href="/contact">Contact Us</Link>
                            </Button>
                            <Button variant="outline" className="border-white/20 text-black hover:bg-white/10">
                                <Link href="/solutions">View Solutions</Link>
                            </Button>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2 text-sm text-white/60">
                            <span className="rounded-full border border-white/10 px-3 py-1">Next.js</span>
                            <span className="rounded-full border border-white/10 px-3 py-1">TypeScript</span>
                            <span className="rounded-full border border-white/10 px-3 py-1">Shadcn UI</span>
                            <span className="rounded-full border border-white/10 px-3 py-1">Prisma + Postgres</span>
                        </div>
                    </div>


                    <Card className="border-white/10 bg-white/[0.04]">
                        <CardHeader>
                            <CardTitle className="text-white">What we’re about</CardTitle>
                            <CardDescription className="text-white/60">
                                Practical tech that looks great and works even better.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FeatureRow
                                icon={<Rocket className="h-5 w-5" />}
                                title="Build for speed"
                                desc="Performance-first pages and apps optimized for real users."
                            />
                            <FeatureRow
                                icon={<Shield className="h-5 w-5" />}
                                title="Build for security"
                                desc="Sensible defaults, least-privilege access, and secure data handling."
                            />
                            <FeatureRow
                                icon={<Users className="h-5 w-5" />}
                                title="Build for people"
                                desc="Clear UX, clean UI, and maintainable code your team can own."
                            />
                        </CardContent>
                    </Card>
                </div>
            </section>

            <Separator className="bg-white/10" />


            <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:py-16">
                <div className="grid gap-6 lg:grid-cols-3">
                    <Card className="border-white/10 bg-white/[0.04] lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-white">Our story</CardTitle>
                            <CardDescription className="text-white/60">
                                From “just a website” to a complete digital foundation.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 text-white/70">
                            <p>
                                Fountline Digital was created to help businesses avoid cookie-cutter solutions.
                                We focus on custom builds that reflect your brand and support your day-to-day operations.
                            </p>
                            <p>
                                Whether you need a marketing site that converts, a client portal, or internal tools
                                like CRM and inventory tracking, we design systems that can evolve without rewrites.
                            </p>
                            <div className="grid gap-3 pt-2 sm:grid-cols-2">
                                <MiniStat label="Focus" value="Custom Web + Internal Tools" />
                                <MiniStat label="Approach" value="Modular + Scalable Design" />
                                <MiniStat label="Delivery" value="Clean UI, Clean Code" />
                                <MiniStat label="Goal" value="Make tech feel easy" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-white/10 bg-white/[0.04]">
                        <CardHeader>
                            <CardTitle className="text-white">Core values</CardTitle>
                            <CardDescription className="text-white/60">
                                The standards we build by.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <ValueItem text="No fluff—ship what matters." />
                            <ValueItem text="Secure by default." />
                            <ValueItem text="Performance is a feature." />
                            <ValueItem text="Make it maintainable." />
                            <ValueItem text="Design with empathy." />
                        </CardContent>
                    </Card>
                </div>
            </section>

            <Separator className="bg-white/10" />


            <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:py-16">
                <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
                    <div className="space-y-3">
                        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                            Frequently asked questions
                        </h2>
                        <p className="text-white/70">
                            Quick answers to common questions about how we work and what we build.
                        </p>
                    </div>

                    <Card className="border-white/10 bg-white/[0.04]">
                        <CardContent className="pt-6">
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1" className="border-white/10">
                                    <AccordionTrigger className="text-left text-white">
                                        What types of projects do you take on?
                                    </AccordionTrigger>
                                    <AccordionContent className="text-white/70">
                                        Websites, landing pages, client portals, dashboards, lightweight CRM/inventory tools,
                                        and integrations/automation—built with modern, maintainable stacks.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="item-2" className="border-white/10">
                                    <AccordionTrigger className="text-left text-white">
                                        Do you offer ongoing support?
                                    </AccordionTrigger>
                                    <AccordionContent className="text-white/70">
                                        Yes—maintenance, small enhancements, monitoring, and roadmap iterations depending on your needs.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="item-3" className="border-white/10">
                                    <AccordionTrigger className="text-left text-white">
                                        Can you build something that grows over time?
                                    </AccordionTrigger>
                                    <AccordionContent className="text-white/70">
                                        That’s the goal. We design modular features so you can start with an MVP and add modules
                                        (like CRM, invoicing, inventory, scheduling) without rebuilding the foundation.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="item-4" className="border-white/10">
                                    <AccordionTrigger className="text-left text-white">
                                        What’s the typical process?
                                    </AccordionTrigger>
                                    <AccordionContent className="text-white/70">
                                        Discovery → design → build → review → launch. We keep communication tight and deliver in small,
                                        testable milestones.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                </div>
            </section>


            <section className="mx-auto w-full max-w-6xl px-4 pb-14">
                <Card className="border-white/10 bg-white/[0.04]">
                    <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-1">
                            <h3 className="text-lg font-semibold">Ready to build something clean and scalable?</h3>
                            <p className="text-sm text-white/70">
                                Let’s map your goals and ship a modern solution that fits your business.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button className="bg-white text-black hover:bg-white/90"><Link href="/contact">Get a Quote</Link></Button>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </main>
    )
}

function FeatureRow({
                        icon,
                        title,
                        desc,
                    }: {
    icon: React.ReactNode
    title: string
    desc: string
}) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-lg border border-white/10 bg-white/5 p-2 text-white">
                {icon}
            </div>
            <div className="space-y-0.5">
                <div className="font-medium text-white">{title}</div>
                <div className="text-sm text-white/70">{desc}</div>
            </div>
        </div>
    )
}

function ValueItem({ text }: { text: string }) {
    return (
        <div className="flex items-start gap-2 text-white/80">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-white/70" />
            <span className="text-sm">{text}</span>
        </div>
    )
}

function MiniStat({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
            <div className="text-xs text-white/60">{label}</div>
            <div className="text-sm font-medium text-white">{value}</div>
        </div>
    )
}