export default function PortalShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-6xl px-4 py-6">{children}</div>
    </main>
  );
}