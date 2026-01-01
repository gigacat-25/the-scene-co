import { Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const LeafIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-8 w-8 text-primary"
    >
      <path d="M12 22c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
      <path d="M12 2a10 10 0 0 0-10 10c0 4.42 3.58 8 8 8s8-3.58 8-8c0-5.52-4.48-10-10-10z" />
      <path d="M12 22V12" />
      <path d="M2 12h10" />
      <path d="M12 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
    </svg>
  );


export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <LeafIcon />
              <span className="text-xl font-bold font-headline">The Scene Co.</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Crafting unforgettable moments, consciously.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Navigate</h3>
              <ul className="space-y-2">
                <li><Link href="/#packages" className="text-sm text-muted-foreground hover:text-primary">Packages</Link></li>
                <li><Link href="/#sustainability" className="text-sm text-muted-foreground hover:text-primary">Sustainability</Link></li>
                <li><Link href="/#contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" asChild>
                  <a href="#" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="#" aria-label="Instagram">
                    <Instagram className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="#" aria-label="Twitter">
                    <Twitter className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
          <div className="md:col-start-2 md:col-span-2 lg:col-start-auto lg:col-span-1 border-t md:border-t-0 md:border-l pt-8 md:pt-0 md:pl-8 border-dashed">
            <h3 className="font-semibold mb-4">Stay in the know</h3>
            <p className="text-sm text-muted-foreground mb-4">Sign up for our newsletter to get the latest on our events and sustainable practices.</p>
            {/* Newsletter form can be added here */}
            <p className="text-xs text-muted-foreground mt-4">&copy; {new Date().getFullYear()} The Scene Co. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
