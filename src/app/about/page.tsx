import Image from "next/image";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

export const runtime = "edge";

export const metadata = {
    title: "About Us | The Scene Co.",
    description: "Learn more about The Scene Co. and our passionate team dedicated to creating unforgettable events.",
};

export default function AboutPage() {
    return (
        <div className="flex flex-col container mx-auto px-4 py-24 sm:py-32 items-center justify-center min-h-[70vh]">
            <AnimateOnScroll animationClass="animate-slide-in-up" hiddenClass="opacity-0" className="max-w-4xl text-center">
                <Image
                    src="/logo.jpeg"
                    alt="The Scene Co. Logo"
                    width={150}
                    height={150}
                    className="mx-auto rounded-xl shadow-lg mb-8"
                />
                <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-foreground">
                    Who We Are
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                    The Scene Co. is a premium event planning firm specializing in experiential, high-impact, and eco-conscious experiences. We blend extraordinary design with flawless execution.
                </p>
                <p className="text-lg text-muted-foreground">
                    Founded on the principle that every occasion should be as unique as the people hosting it, we go above and beyond standard event protocols to create memories that last a lifetime. Whether it is a TEDx event, a major corporate gathering, or a specialized brand activation, our team orchestrates every detail with precision.
                </p>
            </AnimateOnScroll>
        </div>
    );
}
