import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { name, price, category, image } = body;

    const place = await prisma.place.findFirst({ where: { ownerId: session.user.id } });
    if (!place) return NextResponse.json({ error: "No Place" }, { status: 400 });

    const newProduct = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        category,
        image: image || "",
        placeId: place.id,
        isAvailable: true,
      },
    });

    return NextResponse.json(newProduct);
  } catch (error) {
    return NextResponse.json({ error: "Error creating" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { id, name, price, category, image, isAvailable } = body;

    const product = await prisma.product.findUnique({
      where: { id },
      include: { place: true }
    });

    if (!product || product.place.ownerId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        price: Number(price),
        category,
        image,
        isAvailable,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ error: "Error updating" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const product = await prisma.product.findUnique({
      where: { id },
      include: { place: true }
    });

    if (!product || product.place.ownerId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.product.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting" }, { status: 500 });
  }
}