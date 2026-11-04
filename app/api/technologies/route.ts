import { NextRequest, NextResponse } from "next/server";
import { getTechnologies, updateTechnology } from "@/lib/data/storage";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const techs = await getTechnologies();
  return NextResponse.json(techs);
}

export async function PATCH(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { id, ...updates } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Technology ID is required" }, { status: 400 });
    }
    const updated = await updateTechnology(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Technology not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
