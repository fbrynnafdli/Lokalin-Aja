import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, description, address, category } = body;

    const updatedPlace = await prisma.place.updateMany({
      where: { ownerId: session.user.id },
      data: {
        name,
        description,
        address,
        category,
      },
    });

    return NextResponse.json({ success: true, data: updatedPlace });

  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: "Gagal update profil" }, { status: 500 });
  }
}