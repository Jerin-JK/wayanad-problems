import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 pt-12 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-bold tracking-tighter uppercase bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-4">
              Wayanad Problem Platform
            </h2>
            <p className="text-zinc-400 max-w-sm text-sm">
              A community initiative to voice, track, and resolve issues in Wayanad district.
            </p>
          </div>
          <div className="md:text-right">
            <h3 className="text-zinc-200 font-bold uppercase tracking-wider text-sm mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/problems" className="hover:text-emerald-400 transition-colors">Browse Problems</Link>
              </li>
              <li>
                <Link href="/submit" className="hover:text-emerald-400 transition-colors">Submit Problem</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-zinc-800/50 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-zinc-500 text-xs">
            © {new Date().getFullYear()} Wayanad Problems. All rights reserved.
          </p>
          <p className="text-zinc-500 text-xs mt-2 md:mt-0 flex items-center">
            Built with <span className="text-red-500 mx-1">❤️</span> for Wayanad
          </p>
        </div>
      </div>
    </footer>
  );
}
