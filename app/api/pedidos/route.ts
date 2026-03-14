import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, customer, shipping, deliveryMethod, payment, total } = body;

    // Generate a unique order number (e.g., ORD-123456)
    const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        total,
        status: "PENDIENTE",
        customerName: `${customer.firstName} ${customer.lastName}`,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        customerAddress: customer.address,
        customerCity: customer.city,
        customerZip: customer.zip,
        customerCountry: customer.country,
        customerDocument: customer.document,
        shippingAddress: shipping.address,
        shippingCity: shipping.city,
        shippingZip: shipping.zip,
        shippingCountry: shipping.country,
        deliveryMethod,
        paymentMethod: payment.method,
        paymentType: payment.type,
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
            size: item.selectedSize,
            color: item.selectedColor,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    console.log("Nuevo pedido registrado en DB:", order.orderNumber);

    return NextResponse.json({
      success: true,
      message: "Pedido registrado con éxito",
      order
    }, { status: 201 });
  } catch (error) {
    console.error("Error en API Route pedidos:", error);
    return NextResponse.json({
      success: false,
      message: "Error al procesar el pedido"
    }, { status: 500 });
  }
}

