import { PrismaClient } from "@prisma/client";

//Components
import BackButton from "@/components/Buttons/BackButton/BackButton";

//Authentication
import { auth } from "@/auth";

//Styles
import "./orders.scss";

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
    <div className="page orders">
      <BackButton>Orders</BackButton>
      {/* <UserOrders orders={orders} /> */}
      {orders.map((order) => (
        <div className="orders__item" key={order.id}>
          <p className="orders__item__date">
            {new Date(order.createdAt).toLocaleString()}
          </p>

          {order.items.map((orderItem) => (
            <div key={orderItem.id}>
              <p>{orderItem.productName}</p>
              {/* <Image
                src={orderItem.productImage}
                alt=""
                width={140}
                height={140}
              /> */}
              <img
                src={orderItem.productImage}
                width="140"
                height="140"
              />
            </div>
          ))}
          <p>Total: £{order.amount / 100}</p>
        </div>
      ))}
    </div>
  );
}
