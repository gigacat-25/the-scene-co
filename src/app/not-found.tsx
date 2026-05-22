import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export const runtime = "edge";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-32 sm:py-48 text-center">
      <h1 className="font-headline text-8xl md:text-9xl font-bold text-primary mb-4">404</h1>
      <h2 className="font-headline text-2xl md:text-3xl font-bold text-white mb-4">Page Not Found</h2>
      <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg">
          <Link href="/">
            <Home className="h-4 w-4 mr-2" /> Go Home
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/portfolio">
            <ArrowLeft className="h-4 w-4 mr-2" /> View Our Work
          </Link>
        </Button>
      </div>
    </div>
  );
}
