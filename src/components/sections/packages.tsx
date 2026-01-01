import Image from "next/image";
import { CheckCircle2, Leaf, Mic, PartyPopper, Users } from "lucide-react";

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
    icon: <Mic className="h-6 w-6 text-primary" />,
    features: [
      "Stage Design & A/V",
      "Speaker Management",
      "Live Streaming & Recording",
      "Audience Engagement Tools",
    ],
    ecoHighlights: [
      "Recycled material for badges",
      "Locally-sourced catering",
    ],
  },
  {
    id: "corporate",
    title: "Corporate Functions",
    description: "Elevate your brand with professional, engaging, and eco-conscious corporate events.",
    image: PlaceHolderImages.find((img) => img.id === "corporate"),
    icon: <Users className="h-6 w-6 text-primary" />,
    features: [
      "Conferences & Seminars",
      "Product Launches",
      "Team Building Retreats",
      "Gala Dinners & Awards",
    ],
    ecoHighlights: [
      "Digital invitations & programs",
      "Carbon-offsetting for travel",
    ],
  },
  {
    id: "other",
    title: "Bespoke Celebrations",
    description: "From intimate gatherings to grand celebrations, we make your special moments shine.",
    image: PlaceHolderImages.find((img) => img.id === "other"),
    icon: <PartyPopper className="h-6 w-6 text-primary" />,
    features: [
      "Weddings & Anniversaries",
      "Private Parties",
      "Non-profit Fundraisers",
      "Art & Fashion Shows",
    ],
    ecoHighlights: [
      "Sustainable floral arrangements",
      "Zero-waste food service",
    ],
  },
];

export function Packages() {
  return (
    <section className="w-full">
      <AnimateOnScroll
        animationClass="animate-slide-in-up"
        hiddenClass="opacity-0"
        className="text-center mb-12"
      >
        <Badge variant="outline">Our Offerings</Badge>
        <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl mt-2">
          Tailored Events, Sustainable by Design
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          We offer a range of packages to suit your needs, each with a commitment to environmental responsibility.
        </p>
      </AnimateOnScroll>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg, index) => (
          <AnimateOnScroll
            key={pkg.id}
            animationClass="animate-slide-in-up"
            hiddenClass="opacity-0"
            delay={`${index * 0.1}s`}
          >
          <Card className="flex flex-col h-full overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-2xl">
            <CardHeader className="p-0">
              {pkg.image && (
                <div className="relative h-48 w-full">
                  <Image
                    src={pkg.image.imageUrl}
                    alt={pkg.image.description}
                    fill
                    className="object-cover"
                    data-ai-hint={pkg.image.imageHint}
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-2">
                    {pkg.icon}
                    <CardTitle className="font-headline text-2xl">{pkg.title}</CardTitle>
                </div>
                <CardDescription>{pkg.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-6">
              <div>
                <h4 className="font-semibold mb-2 text-sm">What's Included</h4>
                <ul className="space-y-2">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
               <div>
                <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-green-700" />
                    <span>Eco-Friendly Highlights</span>
                </h4>
                <ul className="space-y-2">
                  {pkg.ecoHighlights.map((highlight) => (
                    <li key={highlight} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Leaf className="h-4 w-4 text-green-700/70" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full font-bold">
                <Link href="/#contact">Inquire Now</Link>
              </Button>
            </CardFooter>
          </Card>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}
