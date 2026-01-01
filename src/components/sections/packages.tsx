import Image from "next/image";
import { CheckCircle2, Leaf, Mic, Briefcase, Megaphone, School } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";
import { AnimateOnScroll } from "../animate-on-scroll";

const packages = [
  {
    id: "tedx",
    title: "TEDx & Speaker Events",
    description: "Amplify powerful ideas with flawless execution and a sustainable footprint.",
    image: PlaceHolderImages.find((img) => img.id === "tedx"),
    icon: <Mic className="h-8 w-8 text-primary" />,
    features: [
      "Stage & Set Design",
      "AV & Theatrical Lighting",
      "Speaker Coordination",
      "Live Streaming & Recording",
    ],
    ecoHighlights: [
      "Recycled material staging",
      "Digital ticketing & programs",
    ],
  },
  {
    id: "corporate",
    title: "Corporate & Business",
    description: "Elevate your brand with professional, engaging, and eco-conscious corporate events.",
    image: PlaceHolderImages.find((img) => img.id === "corporate"),
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    features: [
      "Conferences & Summits",
      "Product Launches",
      "Networking Receptions",
      "Gala Dinners & Awards",
    ],
    ecoHighlights: [
      "Carbon-offsetting for travel",
      "Locally-sourced catering",
    ],
  },
  {
    id: "brand",
    title: "Brand & Experiential",
    description: "Create immersive brand worlds and unforgettable moments for your audience.",
    image: PlaceHolderImages.find((img) => img.id === "brand"),
    icon: <Megaphone className="h-8 w-8 text-primary" />,
    features: [
      "Brand Activations",
      "Immersive Installations",
      "Pop-Up Shops",
      "Cultural & Lifestyle Events",
    ],
    ecoHighlights: [
      "Upcycled & reusable decor",
      "Zero-waste service principles",
    ],
  },
    {
    id: "conference",
    title: "Conferences",
    description: "Large-scale conferences that are impactful and sustainably produced.",
    image: PlaceHolderImages.find((img) => img.id === "conference"),
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    features: [
      "Multi-track agenda planning",
      "Exhibitor & sponsor management",
      "Delegate registration & services",
      "Hybrid event technology",
    ],
    ecoHighlights: [
        "Sustainably sourced swag",
        "Paperless information sharing",
    ],
  },
  {
    id: "college",
    title: "College & Cultural",
    description: "Vibrant and memorable events for the next generation of leaders.",
    image: PlaceHolderImages.find((img) => img.id === "college"),
    icon: <School className="h-8 w-8 text-primary" />,
    features: [
      "University Fests",
      "Cultural & Arts Festivals",
      "Alumni Events",
      "Student leadership summits",
    ],
    ecoHighlights: [
        "Community engagement initiatives",
        "Local artist showcases",
    ],
  },
];

export function Packages() {
  return (
    <section className="w-full">
      <AnimateOnScroll
        animationClass="animate-slide-in-up"
        hiddenClass="opacity-0"
        className="text-center mb-16"
      >
        <Badge variant="secondary" className="text-sm">Our Expertise</Badge>
        <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl mt-4">
          Services, Tailored to Your Vision
        </h2>
        <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
          From intimate conferences to large-scale brand activations, we deliver excellence with a commitment to sustainability.
        </p>
      </AnimateOnScroll>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {packages.map((pkg, index) => (
          <AnimateOnScroll
            key={pkg.id}
            animationClass="animate-slide-in-up"
            hiddenClass="opacity-0"
            delay={`${index * 0.1}s`}
          >
          <Card className="flex flex-col h-full bg-card/50 backdrop-blur-sm border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_-5px] hover:shadow-primary/20 hover:-translate-y-2">
            <CardHeader className="p-0">
              {pkg.image && (
                <div className="relative h-56 w-full">
                  <Image
                    src={pkg.image.imageUrl}
                    alt={pkg.image.description}
                    fill
                    className="object-cover"
                    data-ai-hint={pkg.image.imageHint}
                  />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3">
                    {pkg.icon}
                    <CardTitle className="font-headline text-2xl text-white">{pkg.title}</CardTitle>
                </div>
                <CardDescription className="text-muted-foreground">{pkg.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-6 px-6">
              <div>
                <h4 className="font-semibold mb-3 text-base text-white">What's Included</h4>
                <ul className="space-y-2.5">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
               <div>
                <h4 className="font-semibold mb-3 text-base text-white flex items-center gap-2">
                    <Leaf className="h-4 w-4" />
                    <span>Eco-Conscious Highlights</span>
                </h4>
                <ul className="space-y-2.5">
                  {pkg.ecoHighlights.map((highlight) => (
                    <li key={highlight} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Leaf className="h-4 w-4 text-primary/70 shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="p-6">
              <Button asChild className="w-full font-bold" variant="secondary">
                <Link href="/#contact">Enquire Now</Link>
              </Button>
            </CardFooter>
          </Card>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}
