import React from "react";
import { useGetAllOrdersQuery } from "../../../slices/orderApiSlice";
import Loader from "../../common/Loader";
import Message from "../../common/Message";
import OrdersList from "../OrdersList";

const Orders = () => {
  const {
    data: orders,
    isLoading: ordersLoading,
    error,
    refetch,
  } = useGetAllOrdersQuery();

  return (
    <>
      <h2 className="my-2">Orders</h2>
      {ordersLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{`${error?.data?.error}`}</Message>
      ) : (
        <OrdersList orders={orders} refetch={refetch} admin={true} />
      )}
    </>
  );
};

export default Orders;
