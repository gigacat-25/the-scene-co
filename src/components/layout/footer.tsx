import { Instagram, Linkedin, Twitter, Mail, Phone, BotMessageSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const LogoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-8 w-8 text-primary"
  >
    <path d="M12 1.5a10.5 10.5 0 100 21 10.5 10.5 0 000-21zM4 12a8 8 0 014.2-7.1l-.8 1.2a6.5 6.5 0 00-2.3 5.9 6.5 6.5 0 006.4 6.5 6.5 6.5 0 006.4-6.5 6.5 6.5 0 00-2.3-5.9l-.8-1.2A8 8 0 114 12z" />
  </svg>
);


export function Footer() {
  return (
    <footer className="bg-background/50 border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="flex flex-col items-start col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <LogoIcon />
              <span className="text-2xl font-bold font-headline text-white">The Scene Co.</span>
            </Link>
            <p className="text-muted-foreground text-base max-w-md">
              Events & Experiences, Curated to Perfection. We are your partners in creating unforgettable, sustainable, and impactful events.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-2">
             <div>
              <h3 className="font-semibold mb-4 text-white">Navigate</h3>
              <ul className="space-y-3">
                <li><Link href="/#packages" className="text-sm text-muted-foreground hover:text-primary">Packages</Link></li>
                <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
                <li><Link href="/sustainability" className="text-sm text-muted-foreground hover:text-primary">Sustainability</Link></li>
                <li><Link href="/#contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Connect</h3>
              <div className="flex space-x-2">
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
               <div className="mt-4 space-y-2">
                 <a href="mailto:hello@thesceve.co" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                    <Mail className="h-4 w-4" />
                    <span>hello@thescene.co</span>
                 </a>
                 <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                    <BotMessageSquare className="h-4 w-4" />
                    <span>WhatsApp Us</span>
                 </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} The Scene Co. All Rights Reserved.</p>
            <div className="flex gap-4 mt-4 sm:mt-0">
                <Link href="/privacy" className="text-xs text-muted-foreground hover:text-primary">Privacy Policy</Link>
                <Link href="/terms" className="text-xs text-muted-foreground hover:text-primary">Terms of Service</Link>
            </div>
        </div>
      </div>
    </footer>
  );
}
