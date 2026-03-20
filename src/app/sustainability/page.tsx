import { Sustainability } from "@/components/sections/sustainability";

export const runtime = "edge";

export const metadata = {
    title: "Sustainability | The Scene Co.",
    description: "Discover how The Scene Co. implements zero-waste and carbon-neutral policies for events.",
};

export default function SustainabilityPage() {
    return (
        <div className="flex flex-col container mx-auto px-4 py-24 sm:py-32 min-h-[70vh]">
            <Sustainability />
        </div>
    );
}
