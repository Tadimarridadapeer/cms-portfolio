import { NextRequest, NextResponse } from "next/server";
import { checkAdminCredentials, setAdminSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const isValid = await checkAdminCredentials(email, password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid administrator credentials" },
        { status: 401 }
      );
    }

    await setAdminSessionCookie(email);

    return NextResponse.json({
      success: true,
      message: "Authentication successful",
      user: { email, role: "admin" },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Authentication error" },
      { status: 500 }
    );
  }
}
