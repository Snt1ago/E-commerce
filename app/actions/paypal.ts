"use server";

import { createOrder } from "@/lib/paypal";
import { CartItem } from "@/app/store/cart";

export async function createPayPalOrder(items: CartItem[]) {
  try {
    // Check for placeholder keys
    if (process.env.PAYPAL_CLIENT_ID === "placeholder_client_id") {
      console.warn("Using MOCK PayPal checkout because no valid Client ID was provided.");
      return { url: `/checkout/success` };
    }

    const order = await createOrder(items);
    
    // The approval URL is where we need to redirect the user
    const approvalUrl = order.links.find((link: any) => link.rel === 'approve')?.href;

    if (!approvalUrl) {
      throw new Error("No approval URL found in PayPal response");
    }

    return { url: approvalUrl };
  } catch (error) {
    console.error("PayPal Order Error:", error);
    throw new Error("Error creating PayPal order");
  }
}
