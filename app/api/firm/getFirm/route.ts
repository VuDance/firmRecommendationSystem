import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(request: NextRequest) {
  try {
    const id: any = request.nextUrl.searchParams.get("id");

    const firm = await prisma.firm.findMany({
      select: {
        id: true,
        Name: true,
      },
    });
    return NextResponse.json({
      firm: firm,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
