"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LikeButtonProps {
    eventId: number;
    initialLikes?: number;
}

export function LikeButton({ eventId, initialLikes = 0 }: LikeButtonProps) {
    const [likes, setLikes] = useState(initialLikes);
    const [isLiked, setIsLiked] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLike = async () => {
        if (loading) return;
        const newLiked = !isLiked;
        setIsLiked(newLiked);
        setLikes((prev) => (newLiked ? prev + 1 : Math.max(0, prev - 1)));

        setLoading(true);
        try {
            const res = await fetch(`/api/events/${eventId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: newLiked ? "like" : "unlike" }),
            });
            if (res.ok) {
                const data = await res.json();
                setLikes(data.likes);
            }
        } catch {
            // Silently revert on error
            setIsLiked(!newLiked);
            setLikes((prev) => (!newLiked ? prev + 1 : Math.max(0, prev - 1)));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            className={`flex items-center gap-1.5 focus:ring-0 hover:bg-transparent ${isLiked ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-red-400"
                }`}
            onClick={handleLike}
            disabled={loading}
        >
            <Heart
                className={`h-5 w-5 transition-transform ${isLiked ? "fill-current scale-110" : ""}`}
            />
            <span className="text-sm font-medium">{likes}</span>
        </Button>
    );
}
