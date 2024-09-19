import { actors } from "@/db";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    const actor = actors.find(actor => actor.id === id);

    if (!actor) {
        return NextResponse.json({ message: 'Not found'}, { status: 404 });
    }

    return NextResponse.json(actor);
}