import { movies } from "@/db";
import { simulateDbAccess } from "@/utils";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET() {
  await simulateDbAccess();

  return NextResponse.json(movies);
}
