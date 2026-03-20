import { Leadership } from "@/components/sections/leadership";

export const runtime = "edge";

export default function TeamPage() {
    return (
        <main className="flex flex-col min-h-screen pt-24">
            <div className="container mx-auto px-4 py-12">
                <Leadership />
            </div>
        </main>
    );
}
