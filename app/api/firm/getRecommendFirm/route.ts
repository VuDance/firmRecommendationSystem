import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { predictGenre } from "@/app/fucntion";
import { Firm } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const id: any = request.nextUrl.searchParams.get("id");

    const firm = await prisma.firm.findUnique({
      where: {
        id: parseInt(id, 10),
      },
      include: {
        genres: true,
      },
    });
    const listFirm = await prisma.firm.findMany({
      include: {
        genres: true,
      },
    });

    if (firm && listFirm) {
      const data = predictGenre(firm, 3, listFirm);
      const recommendFirm: Firm[] = [];
      for (let i = 0; i < data.length; i++) {
        const firm = await prisma.firm.findUnique({
          where: {
            Name: data[i].name,
          },
        });
        if (firm) {
          recommendFirm.push(firm);
        }
      }
      return NextResponse.json({
        data: recommendFirm,
        message: "ok",
      });
    }

    return NextResponse.json({ message: "ok" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
