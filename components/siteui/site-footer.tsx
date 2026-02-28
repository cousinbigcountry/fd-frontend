import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/solutions" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-zinc-800 bg-black">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/FD_Logo_White.svg"
                alt="Fountline Digital"
                width={170}
                height={120}
                className="h-20 w-auto"
              />
              <span className="sr-only">Fountline Digital</span>
            </Link>

            <p className="max-w-md text-sm leading-relaxed text-zinc-400">
              Custom-coded websites, business systems, and scalable digital solutions—
              built clean, fast, and secure.
            </p>

            <div className="text-xs text-zinc-500">
              Greenville, SC • Support:{" "}
              <span className="text-zinc-300">support@yourdomain.com</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-1">
            <div>
              <h3 className="text-sm font-semibold text-zinc-200">Pages</h3>
              <ul className="mt-3 space-y-2">
                {FOOTER_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-zinc-200">Legal</h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}