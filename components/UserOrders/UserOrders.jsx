import React from "react";

const UserOrders = ({ orders }) => {
  console.log(orders);
  return (
    <div>
      {orders.map((order) => (
        <div key={order.id}>
          <h2>Order ID: {order.id}</h2>
          <p>Amount: £{order.amount / 100}</p>
          <p>
            Created At: {new Date(order.createdAt).toLocaleString()}
          </p>
          <h3>Items:</h3>
          <ul>
            {order.items.map((item) => (
              <li key={item.id}>
                <p>Name: {item.productName}</p>
                <p>Price: £{item.unitAmount / 100}</p>
                <p>Quantity: {item.quantity}</p>
                <img
                  src={item.productImage}
                  alt={item.productName}
                  width="100"
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default UserOrders;
