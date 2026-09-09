import Link from 'next/link';

export default function VerifyRequestPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10 text-center">
        {/* Animated envelope icon */}
        <div className="relative w-28 h-28 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full bg-emerald-500/10 border border-emerald-500/20 animate-pulse" />
          <div className="absolute inset-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <svg className="w-12 h-12 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-3xl p-10 backdrop-blur-xl shadow-2xl shadow-black/60">
          <h1 className="text-3xl font-black uppercase tracking-tight text-zinc-100 mb-4">
            Check Your Email
          </h1>
          <p className="text-zinc-400 leading-relaxed mb-6">
            A magic sign-in link has been sent to your email address. Click the link in the email to complete your sign-in — no password needed.
          </p>

          <div className="space-y-3 text-left bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-5 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-emerald-400 text-xs font-bold">1</span>
              </div>
              <p className="text-zinc-300 text-sm">Open your email inbox</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-emerald-400 text-xs font-bold">2</span>
              </div>
              <p className="text-zinc-300 text-sm">Find the email from <span className="text-cyan-400 font-medium">Wayanad Problems</span></p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-emerald-400 text-xs font-bold">3</span>
              </div>
              <p className="text-zinc-300 text-sm">Click the <span className="text-emerald-400 font-medium">Sign in</span> button in the email</p>
            </div>
          </div>

          <p className="text-xs text-zinc-600 mb-6">
            The link expires in 24 hours. If you don&apos;t see the email, check your spam folder.
          </p>

          <Link
            href="/auth/signin"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
