"use client";

import { useState, useEffect } from "react";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LikeButton } from "@/components/ui/like-button";
import { Loader2 } from "lucide-react";
import Link from "next/link";

interface Event {
    id: number;
    title: string;
    category: string;
    date: string;
    description: string;
    image_url: string;
    likes: number;
}

export default function PastEventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/events")
            .then((r) => r.json())
            .then((d) => setEvents(d.events || []))
            .catch(() => setEvents([]))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="container mx-auto px-4 py-24 sm:py-32 min-h-screen">
            <AnimateOnScroll
                animationClass="animate-slide-in-up"
                hiddenClass="opacity-0"
                className="text-center mb-16"
            >
                <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
                    Our Past Events
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Explore a selection of our finest curated experiences. We merge creativity with precision to bring extraordinary visions to life.
                </p>
            </AnimateOnScroll>

            {loading ? (
                <div className="flex justify-center py-24">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : events.length === 0 ? (
                <div className="text-center py-24 text-muted-foreground">
                    No past events to display yet. Check back soon!
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event, index) => (
                        <AnimateOnScroll
                            key={event.id}
                            animationClass="animate-slide-in-up"
                            hiddenClass="opacity-0"
                            delay={`${index * 0.1}s`}
                        >
                            <Link href={`/past-events/${event.id}`} className="block h-full">
                                <Card className="overflow-hidden bg-secondary/20 border-white/10 hover:border-primary/50 transition-all group h-full flex flex-col cursor-pointer">
                                    <div className="relative h-64 w-full overflow-hidden shrink-0">
                                        <img
                                            src={event.image_url}
                                            alt={event.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <Badge variant="secondary" className="backdrop-blur-md bg-background/50 pointer-events-none">
                                                {event.category}
                                            </Badge>
                                        </div>
                                    </div>
                                    <CardContent className="p-6 flex flex-col flex-grow">
                                        <p className="text-sm text-primary mb-2 font-medium">{event.date}</p>
                                        <h3 className="text-xl font-bold font-headline mb-3 text-white group-hover:text-primary transition-colors">
                                            {event.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                                            {event.description}
                                        </p>
                                        <div
                                            className="flex justify-end border-t border-white/5 pt-3 mt-auto"
                                            onClick={(e) => e.preventDefault()} // Prevent link click when liking
                                        >
                                            <LikeButton eventId={event.id} initialLikes={event.likes} />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </AnimateOnScroll>
                    ))}
                </div>
            )}
        </div>
    );
}
