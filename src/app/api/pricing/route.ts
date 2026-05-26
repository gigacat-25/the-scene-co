import { NextRequest, NextResponse } from "next/server";
import { getPublishedPricing, getAllPricingPlans, getPricingFeatures } from "@/lib/db";
import { getBindings, isAuthenticated } from "@/lib/cf-bindings";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get("admin") === "1" && isAuthenticated(request as NextRequest);
    
    const plans = isAdmin ? await getAllPricingPlans() : await getPublishedPricing();
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

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = (await getBindings()).db;
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });

  try {
    const body = await request.json() as {
      name?: string;
      price_min?: number;
      price_max?: number;
      currency?: string;
      description?: string;
      delivery_time?: string;
      is_popular?: number;
      is_published?: number;
      order_index?: number;
    };
    const { name, price_min, price_max, currency, description, delivery_time, is_popular, is_published, order_index } = body;
    
    if (!name || price_min === undefined || !description || !delivery_time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Generate a URL-safe slug from the name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") + "-" + Math.random().toString(36).slice(2, 6);

    await db.prepare(
      "INSERT INTO pricing_plans (name, slug, price_min, price_max, currency, description, delivery_time, is_popular, is_published, order_index) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    ).bind(
      name,
      slug,
      price_min,
      price_max ?? 0,
      currency || "₹",
      description,
      delivery_time,
      is_popular ?? 0,
      is_published ?? 1,
      order_index ?? 0
    ).run();

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
