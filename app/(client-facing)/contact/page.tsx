import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
    return (
        <main className="min-h-[calc(100vh-4rem)] bg-black text-white">
            <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14">
                <div className="mb-8 sm:mb-10">
                    <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                        Contact Us
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm text-zinc-300 sm:text-base">
                        Tell us what you’re building. We’ll get back to you quickly with next steps.
                    </p>
                </div>


                <div className="grid gap-6 lg:grid-cols-2">

                    <Card className="border-zinc-800 bg-zinc-950/60">
                        <CardHeader>
                            <CardTitle className="text-white">Send a message</CardTitle>
                            <CardDescription className="text-zinc-300">
                                Fill out the form and we’ll respond within 1–2 business days.
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form className="space-y-5">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName" className="text-zinc-200">
                                            First name
                                        </Label>
                                        <Input
                                            id="firstName"
                                            placeholder="John"
                                            className="border-zinc-800 bg-black/40 text-white placeholder:text-zinc-500"
                                            autoComplete="given-name"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="lastName" className="text-zinc-200">
                                            Last name
                                        </Label>
                                        <Input
                                            id="lastName"
                                            placeholder="Smith"
                                            className="border-zinc-800 bg-black/40 text-white placeholder:text-zinc-500"
                                            autoComplete="family-name"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-zinc-200">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="you@company.com"
                                        className="border-zinc-800 bg-black/40 text-white placeholder:text-zinc-500"
                                        autoComplete="email"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="subject" className="text-zinc-200">
                                        Subject
                                    </Label>
                                    <Input
                                        id="subject"
                                        placeholder="Project inquiry"
                                        className="border-zinc-800 bg-black/40 text-white placeholder:text-zinc-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message" className="text-zinc-200">
                                        Message
                                    </Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Tell us a bit about what you need…"
                                        className="min-h-[140px] resize-none border-zinc-800 bg-black/40 text-white placeholder:text-zinc-500"
                                    />
                                    <p className="text-xs text-zinc-500">
                                        By submitting, you agree we may contact you about your request.
                                    </p>
                                </div>

                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="text-xs text-zinc-500">
                                        Prefer email? Reach us at{" "}
                                        <span className="text-zinc-300">hello@yourdomain.com</span>
                                    </div>

                                    <Button
                                        type="button"
                                        className="w-full bg-white text-black hover:bg-zinc-200 sm:w-auto"
                                    >
                                        Send message
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>


                    <div className="space-y-6">
                        <Card className="border-zinc-800 bg-zinc-950/60">
                            <CardHeader>
                                <CardTitle className="text-white">Company info</CardTitle>
                                <CardDescription className="text-zinc-300">
                                    Placeholder details (replace with your real info).
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-5">
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="mt-0.5 h-5 w-5 text-zinc-300" />
                                        <div>
                                            <p className="font-medium text-white">Office</p>
                                            <p className="text-sm text-zinc-300">
                                                123 Main Street, Suite 400<br />
                                                Your City, ST 12345
                                            </p>
                                        </div>
                                    </div>

                                    <Separator className="bg-zinc-800" />

                                    <div className="flex items-start gap-3">
                                        <Mail className="mt-0.5 h-5 w-5 text-zinc-300" />
                                        <div>
                                            <p className="font-medium text-white">Email</p>
                                            <p className="text-sm text-zinc-300">hello@yourdomain.com</p>
                                        </div>
                                    </div>

                                    <Separator className="bg-zinc-800" />

                                    <div className="flex items-start gap-3">
                                        <Phone className="mt-0.5 h-5 w-5 text-zinc-300" />
                                        <div>
                                            <p className="font-medium text-white">Phone</p>
                                            <p className="text-sm text-zinc-300">(555) 123-4567</p>
                                        </div>
                                    </div>

                                    <Separator className="bg-zinc-800" />

                                    <div className="flex items-start gap-3">
                                        <Clock className="mt-0.5 h-5 w-5 text-zinc-300" />
                                        <div>
                                            <p className="font-medium text-white">Hours</p>
                                            <p className="text-sm text-zinc-300">
                                                Mon–Fri: 9:00 AM – 5:00 PM<br />
                                                Sat–Sun: Closed
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl border border-zinc-800 bg-black/30 p-4">
                                    <p className="text-sm font-medium text-white">What we can help with</p>
                                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-300">
                                        <li>Custom websites & web apps</li>
                                        <li>CRM/ERP modules and automation</li>
                                        <li>Hosting, security, and maintenance</li>
                                        <li>Integrations (email, payments, analytics)</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>


                        <Card className="border-zinc-800 bg-gradient-to-b from-zinc-950/60 to-black">
                            <CardContent className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-base font-semibold text-white">Want a faster reply?</p>
                                    <p className="text-sm text-zinc-300">
                                        Include your timeline, budget range, and the main goal.
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    className="border-zinc-700 bg-transparent text-white hover:bg-zinc-900"
                                    type="button"
                                >
                                    <Link href="/solutions">View services</Link>

                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </main>
    );
}