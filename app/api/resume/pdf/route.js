import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    message: "Server-side PDF route is disabled. PDFs are generated client-side using @react-pdf/renderer.",
  });
}
