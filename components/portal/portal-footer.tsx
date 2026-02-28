export default function PortalFooter() {
    return (
        <footer className="border-t border-white/10 bg-black">
            <div className="mx-auto w-full max-w-6xl px-4 py-6 text-xs text-white/60 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p>© {new Date().getFullYear()} Fountline Digital LLC — Internal Portal</p>
            </div>
        </footer>
    );
}