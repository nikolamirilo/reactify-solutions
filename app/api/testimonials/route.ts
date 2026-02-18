import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { revalidateData } from "@/helpers/server";
import { initNeonClient } from "@/lib/neon";

export const dynamic = "force-dynamic"

export async function GET() {
  const sql = await initNeonClient()
  const testimonials = await sql`SELECT * FROM testimonials`;
  revalidateData()
  return NextResponse.json(testimonials);
}
