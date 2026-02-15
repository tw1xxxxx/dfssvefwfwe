import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-white/10 bg-white/5">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/admin" className="text-xl font-bold">
            Alpha Admin
          </Link>
          <div className="flex gap-4">
            <Link href="/" className="text-sm text-white/60 hover:text-white">
              На сайт
            </Link>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
