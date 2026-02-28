import PortalNav from "@/components/portal/portal-nav";
import PortalFooter from "@/components/portal/portal-footer";
import PortalShell from "@/components/portal/portal-shell";
import "./globals.css";

export const metadata = {
  title: "Employee Portal",
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-dvh bg-black text-white flex flex-col">
      <PortalNav />
      <PortalShell>{children}</PortalShell>
      <PortalFooter />
    </div>
      </body>
    </html>
    
  );
}