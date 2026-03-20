"use client";

import { useState, useEffect } from "react";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface TeamMember {
    id: number;
    name: string;
    role: string;
    bio: string;
    image_url: string;
    order_index: number;
}

export function Leadership() {
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/team")
            .then((res) => res.json())
            .then((data) => setTeam(data.team || []))
            .catch(() => setTeam([]))
            .finally(() => setLoading(false));
    }, []);

    return (
        <section id="team" className="py-24 bg-background">
            <div className="container mx-auto px-4">
                {/* Header */}
                <AnimateOnScroll animationClass="animate-slide-in-up" hiddenClass="opacity-0">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="font-headline text-3xl md:text-5xl font-bold text-white mb-6">
                            Our Event Architects
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Meet the visionary planners, producers, and designers at The Scene Co. who turn your extraordinary ideas into unforgettable reality.
                        </p>
                    </div>
                </AnimateOnScroll>

                {/* Team Grid */}
                {loading ? (
                    <div className="flex justify-center p-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
                ) : team.length === 0 ? (
                    <p className="text-center text-muted-foreground">Team members coming soon!</p>
                ) : (
                    <div className="flex flex-wrap justify-center gap-8">
                        {team.map((member, index) => (
                            <AnimateOnScroll
                                key={member.id}
                                animationClass="animate-slide-in-up"
                                hiddenClass="opacity-0"
                                delay={`${index * 0.1}s`}
                                className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-md"
                            >
                                <Card className="bg-secondary/30 border-white/10 overflow-hidden hover:border-primary/50 transition-colors group w-full">
                                    <div className="aspect-[4/5] relative overflow-hidden">
                                        <img
                                            src={member.image_url}
                                            alt={member.name}
                                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                                        <div className="absolute bottom-0 left-0 p-6">
                                            <h3 className="font-headline text-2xl font-bold text-white mb-1">
                                                {member.name}
                                            </h3>
                                            <p className="text-primary font-medium">{member.role}</p>
                                        </div>
                                    </div>
                                    <CardContent className="p-6">
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {member.bio}
                                        </p>
                                    </CardContent>
                                </Card>
                            </AnimateOnScroll>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
