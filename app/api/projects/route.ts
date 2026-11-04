import { NextRequest, NextResponse } from "next/server";
import { getProjects, saveProject } from "@/lib/data/storage";
import { getAdminSession } from "@/lib/auth";
import { projectSchema } from "@/lib/validations/project";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const includeDrafts = searchParams.get("includeDrafts") === "true";

  if (includeDrafts) {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const projects = await getProjects(true);
    return NextResponse.json(projects);
  }

  const projects = await getProjects(false);
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validated = projectSchema.safeParse(body);

    if (!validated.success) {
      const errorMsg = validated.error.errors.map((e) => e.message).join(", ");
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const saved = await saveProject(validated.data);
    return NextResponse.json(saved, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
