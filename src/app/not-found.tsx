export const runtime = 'edge';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F2EE] flex flex-col items-center justify-center p-8 text-center">
      <p className="font-mono text-xs text-[#ADA0C8] tracking-widest uppercase mb-4">Error 404</p>
      <h1 className="font-mono text-8xl font-black text-[#7A4DFF] mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
      <p className="text-[#ADA0C8] max-w-md mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="px-6 py-3 rounded bg-gradient-to-r from-[#251187] via-[#6542DA] to-[#7A4DFF] text-white font-semibold text-sm hover:opacity-90 transition-opacity"
      >
        Go Home
      </a>
    </div>
  );
}
