import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
import { logToMemory } from "../../../lib/logger";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});
const prisma = new PrismaClient();

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  if (req.method === "POST") {
    logToMemory("Webhook request received");
    let event;
    try {
      //Buffered request from body (must be raw body hence buffer)
      const buf = await req.text();
      logToMemory("Request", JSON.stringify(buf));
      //Stripe signature to compare both body's
      const sig = headers().get("stripe-signature");

      //Constructing webhook based on previous information
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
      logToMemory(`Webhook verified: ${JSON.stringify(event)}`);
    } catch (err) {
      logToMemory(
        `⚠️ Webhook signature verification failed: ${err.message}`
      );
      return new Response(`Webhook Error: ${err.message}`, {
        status: 400,
      });
    }

    try {
      if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        logToMemory(
          `Checkout session completed: ${JSON.stringify(session)}`
        );

        // Check for email in different locations
        const userEmail =
          session.customer_email || session.customer_details?.email;

        if (userEmail) {
          //Looking for a user in database
          const user = await prisma.user.findUnique({
            where: { email: userEmail },
          });

          if (user) {
            logToMemory(`User found: ${JSON.stringify(user)}`);

            //Create new order entry in database under user record
            const order = await prisma.order.create({
              data: {
                stripeId: session.id,
                amount: session.amount_total,
                userId: user.id,
              },
            });

            logToMemory(
              `Created Prisma order: ${JSON.stringify(order)}`
            );

            //Taking line_items from stripe_checkout.js
            const lineItems =
              await stripe.checkout.sessions.listLineItems(
                session.id
              );
            logToMemory(
              `Line items to be saved: ${JSON.stringify(lineItems)}`
            );

            await Promise.all(
              lineItems.data.map(async (item) => {
                // Fetch product data to get the images
                // Stripe does not provide them in line_items
                const product = await stripe.products.retrieve(
                  item.price.product
                );
                const productImage =
                  product.images.length > 0 ? product.images[0] : "";

                logToMemory(
                  `Product with images: ${JSON.stringify(product)}`
                );

                //Create entry in Order providing line items
                await prisma.orderItem.create({
                  data: {
                    orderId: order.id, // This should be the integer ID from your Order table
                    productName: item.description,
                    productImage: productImage,
                    unitAmount: item.amount_subtotal,
                    quantity: item.quantity,
                  },
                });
              })
            );

            logToMemory(`Order saved to database: ${session.id}`);
          } else {
            logToMemory(`User not found for email: ${userEmail}`);
          }
        } else {
          logToMemory(`No email found in checkout session`);
        }
      } else {
        logToMemory(`Unhandled event type: ${event.type}`);
      }

      return new Response(JSON.stringify({ received: true }), {
        status: 200,
      });
    } catch (error) {
      logToMemory(`Error processing event: ${error}`);
      return new Response(
        JSON.stringify({ error: "Internal server error" }),
        {
          status: 500,
        }
      );
    }
  } else {
    return new Response("Method Not Allowed", { status: 405 });
  }
}
