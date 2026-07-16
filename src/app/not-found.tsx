import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export const runtime = "edge";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{ background: "#050505", color: "#F7F7FB" }}
    >
      <p
        className="font-mono tracking-widest uppercase mb-4"
        style={{ fontSize: 11, color: "#ADA0C8" }}
      >
        Error 404
      </p>
      <h1
        className="font-mono font-black mb-4"
        style={{ fontSize: "clamp(80px, 15vw, 140px)", color: "#7A4DFF", lineHeight: 1 }}
      >
        404
      </h1>
      <h2
        className="font-bold mb-4"
        style={{ fontSize: "clamp(20px, 3vw, 32px)", color: "#F7F7FB" }}
      >
        Page Not Found
      </h2>
      <p
        className="mb-10 max-w-md"
        style={{ fontSize: 16, color: "#ADA0C8", lineHeight: 1.6 }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold transition-all duration-200"
          style={{
            background: "linear-gradient(90deg, #251187 0%, #6542DA 55%, #7A4DFF 100%)",
            color: "#F7F7FB",
            fontSize: 14,
          }}
        >
          <Home className="h-4 w-4" />
          Go Home
        </Link>
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold transition-all duration-200"
          style={{
            background: "transparent",
            border: "1px solid rgba(122,77,255,0.4)",
            color: "#ADA0C8",
            fontSize: 14,
          }}
        >
          <ArrowLeft className="h-4 w-4" />
          View Our Work
        </Link>
      </div>
    </div>
  );
}
