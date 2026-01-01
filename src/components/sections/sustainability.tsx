import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Recycle, Wind, Handshake } from "lucide-react";
import { AnimateOnScroll } from "../animate-on-scroll";

const commitments = [
  {
    icon: <Leaf className="h-8 w-8 text-primary" />,
    title: "Eco-Friendly Materials",
    description: "We prioritize biodegradable, recyclable, and upcycled materials for all our decorations and setups, minimizing environmental impact.",
  },
  {
    icon: <Recycle className="h-8 w-8 text-primary" />,
    title: "Waste Reduction",
    description: "Our 'zero-waste' approach includes comprehensive composting, recycling programs, and eliminating single-use plastics.",
  },
  {
    icon: <Wind className="h-8 w-8 text-primary" />,
    title: "Carbon Neutrality",
    description: "We partner with certified organizations to offset the carbon footprint of every event, from energy consumption to travel.",
  },
  {
    icon: <Handshake className="h-8 w-8 text-primary" />,
    title: "Sustainable Partners",
    description: "We collaborate with a curated network of local, eco-conscious vendors, from caterers to florists, to ensure a sustainable supply chain.",
  },
];

export function Sustainability() {
  return (
    <section className="w-full">
      <AnimateOnScroll
        animationClass="animate-slide-in-up"
        hiddenClass="opacity-0"
        className="text-center mb-12"
      >
        <Badge>Our Commitment</Badge>
        <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl mt-2">
          Events with a Conscience
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
          Sustainability isn't an afterthought; it's at the core of everything we do. We believe in creating beautiful events that honor and protect our planet.
        </p>
      </AnimateOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {commitments.map((commitment, index) => (
          <AnimateOnScroll
            key={commitment.title}
            animationClass="animate-slide-in-up"
            hiddenClass="opacity-0"
            delay={`${index * 0.1}s`}
          >
            <Card className="text-center h-full border-2 border-transparent hover:border-primary hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mx-auto bg-accent rounded-full p-4 w-fit mb-4">
                  {commitment.icon}
                </div>
                <CardTitle className="font-headline">{commitment.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{commitment.description}</p>
              </CardContent>
            </Card>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}
