import { PrismaClient } from "@prisma/client";

//Database
import prisma from "@/lib/prisma";

//Components
import BackButton from "@/components/Buttons/BackButton/BackButton";

//Authentication
import { auth } from "@/auth";

//Styles
import "./orders.scss";
import Image from "next/image";

export default async function ProfileClient() {
  const prisma = new PrismaClient();
  const session = await auth();

  const userId = session.user.id;

  console.log("Orders user session: ", session.user);

  const orders = await prisma.order.findMany({
    where: {
      //This value must be parsed as a number
      userId: parseInt(userId),
    },
    include: {
      items: true,
    },
    // Add other conditions or sorting/ordering as needed
  });

  console.log("Orders: ", JSON.stringify(orders, null, 2));

  console.log(
    "Order item: ",
    orders.map((order) => order.items)
  );

  return (
    <div className="page orders-container">
      <BackButton>Orders</BackButton>
      {orders.length === 0 ? (
        <div className="orders-container__empty">
          <p>You don`t have any orders yet.</p>
        </div>
      ) : (
        orders.map((order) => (
          <div className="orders-container__order" key={order.id}>
            <p className="orders-container__order__date">
              <strong>Order placed: </strong>
              {new Date(order.createdAt).toLocaleString()}
            </p>

            {order.items.map((orderItem) => (
              <div key={orderItem.id} className="orders-container__order__item">
                <Image
                  className="orders-container__order__item__image"
                  src={orderItem.productImage}
                  alt=""
                  width={140}
                  height={140}
                />
                <div
                  className="flex-center-column"
                  style={{ justifyContent: "center", alignItems: "flex-start" }}
                >
                  <p>
                    <strong>Product name: </strong>
                    {orderItem.productName}
                  </p>
                  <p>
                    <strong>Ordered quantity: </strong>
                    {orderItem.quantity}
                  </p>
                  <p>
                    <strong>Price: </strong>£{orderItem.unitAmount / 100}
                  </p>
                </div>
                <button className="orders-container__order__item__button">
                  View item
                </button>
              </div>
            ))}

            <p className="orders-container__order__total-price">
              <strong>Total: </strong>£{order.amount / 100}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
