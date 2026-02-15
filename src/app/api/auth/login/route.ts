import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body;

  if (username === "valencia_young" && password === "131275valencia") {
    const response = NextResponse.json({ success: true });
    
    // Set cookie that expires in 1 day
    const cookieStore = await cookies();
    cookieStore.set("admin_token", "authenticated", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: "strict",
    });

    return response;
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
