import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // 1. Cek Login
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Kamu harus login dulu!" }, { status: 401 });
    }

    // 2. Baca Data dari Keranjang
    const body = await req.json();
    const { placeId, items, totalPrice } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Keranjang kosong" }, { status: 400 });
    }

    // 3. Simpan ke Database
    const newOrder = await prisma.order.create({
      data: {
        userId: session.user.id,
        placeId: placeId,
        totalPrice: totalPrice, // <--- INI YANG DIBENERIN (Tadinya 'total')
        status: "PENDING", 
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.qty,
            price: item.price,
          })),
        },
      },
    });

    return NextResponse.json({ success: true, orderId: newOrder.id });

  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Gagal membuat pesanan" }, { status: 500 });
  }
}