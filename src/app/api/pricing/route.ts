import { NextResponse } from "next/server";
import { getPublishedPricing, getPricingFeatures } from "@/lib/db";

export const runtime = "edge";

export async function GET() {
  try {
    const plans = await getPublishedPricing();
    const plansWithFeatures = await Promise.all(
      plans.map(async (plan) => {
        const features = await getPricingFeatures(plan.id);
        return { ...plan, features };
      })
    );
    return NextResponse.json({ plans: plansWithFeatures });
  } catch {
    return NextResponse.json({ plans: [] });
  }
}
