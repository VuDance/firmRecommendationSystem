import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      image,
      action,
      horror,
      cartoon,
      romantic,
      adventure,
      superhero,
      sci_fi,
      rating,
    } = body;

    const firm = await prisma.firm.create({
      data: {
        Name: name,
        image,
        rating,
      },
    });
    await prisma.genres.create({
      data: {
        action,
        horror,
        romantic,
        adventure,
        sci_fi,
        superhero,
        cartoon,
        firmId: firm.id,
      },
    });
    return NextResponse.json({ message: "Success" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
