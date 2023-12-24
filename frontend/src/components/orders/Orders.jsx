import React from "react";
import { useGetOrdersQuery } from "../../slices/orderApiSlice";
import Loader from "../common/Loader";
import Message from "../common/Message";
import OrdersList from "./OrdersList";

const Orders = () => {
  const { data: orders, isLoading: orderLoading, error } = useGetOrdersQuery();
  return (
    <>
      <h2 className="my-2">Orders</h2>
      {orderLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{`${error?.data?.error}`}</Message>
      ) : (
        <OrdersList orders={orders} />
      )}
    </>
  );
};

export default Orders;
