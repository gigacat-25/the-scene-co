"use client";

import { useEffect, useState, use } from "react";
import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Loader2, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LikeButton } from "@/components/ui/like-button";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

interface EventDetail {
    id: number;
    title: string;
    category: string;
    date: string;
    description: string;
    image_url: string;
    gallery_urls: string; // JSON string array
    likes: number;
}

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);

    const [event, setEvent] = useState<EventDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/events/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Not found");
                return res.json();
            })
            .then((data) => setEvent(data.event))
            .catch(() => setEvent(null))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                <h1 className="font-headline text-4xl text-white mb-4">Event Not Found</h1>
                <p className="text-muted-foreground mb-8">This event may have been removed or doesn't exist.</p>
                <Button onClick={() => router.push("/past-events")} variant="secondary">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Past Events
                </Button>
            </div>
        );
    }

    // Parse gallery safely
    let gallery: string[] = [];
    try {
        gallery = JSON.parse(event.gallery_urls || "[]");
    } catch (e) { }

    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                <img
                    src={event.image_url}
                    alt={event.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 md:pb-16 container mx-auto">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push("/past-events")}
                        className="mb-8 text-white/70 hover:text-white hover:bg-white/10"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
                    </Button>

                    <AnimateOnScroll animationClass="animate-slide-in-up" hiddenClass="opacity-0">
                        <div className="flex flex-wrap gap-3 mb-4">
                            <Badge className="bg-primary hover:bg-primary text-black">
                                {event.category}
                            </Badge>
                        </div>
                        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                            {event.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-sm text-white/80">
                            <span className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-primary" />
                                {event.date}
                            </span>
                            <LikeButton eventId={event.id} initialLikes={event.likes} />
                        </div>
                    </AnimateOnScroll>
                </div>
            </section>

            {/* Content Section */}
            <section className="container mx-auto px-4 py-16 md:py-24">
                <div className="max-w-3xl mx-auto">
                    <AnimateOnScroll animationClass="animate-slide-in-up" hiddenClass="opacity-0">
                        <h2 className="font-headline text-2xl md:text-3xl text-white mb-6">About The Event</h2>
                        <div className="prose prose-invert prose-lg max-w-none">
                            {/* Handling multiline description safely */}
                            {event.description.split("\n").map((paragraph, idx) => (
                                <p key={idx} className="text-muted-foreground leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </AnimateOnScroll>
                </div>
            </section>

            {/* Gallery Section */}
            {gallery.length > 0 && (
                <section className="container mx-auto px-4 pb-24">
                    <AnimateOnScroll animationClass="animate-slide-in-up" hiddenClass="opacity-0">
                        <h2 className="font-headline text-3xl font-bold text-center text-white mb-12">
                            Event Gallery
                        </h2>
                    </AnimateOnScroll>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                        {gallery.map((url, i) => (
                            <AnimateOnScroll
                                key={i}
                                animationClass="animate-slide-in-up"
                                hiddenClass="opacity-0"
                                delay={`${i * 0.1}s`}
                            >
                                <div className="relative group rounded-xl overflow-hidden aspect-square">
                                    <img
                                        src={url}
                                        alt={`${event.title} gallery image ${i + 1}`}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/opacity-0 group-hover:bg-black/20 transition-all duration-300" />
                                </div>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}
