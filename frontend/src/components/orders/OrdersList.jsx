import React from "react";
import { Button, Table } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";
import { useUpdateOrderToDeliveredMutation } from "../../slices/orderApiSlice";
import Loader from "../common/elements/Loader";
import { rupee } from "../../utils";

const OrdersList = ({ orders, children, refetch, admin = false }) => {
  const [updateOrderToDelivered, { isLoading: deliveryLoading }] =
    useUpdateOrderToDeliveredMutation();
  const deliveryHandler = async (orderId) => {
    try {
      await updateOrderToDelivered(orderId).unwrap();
      refetch();
      toast.success("Order updated successfully!");
    } catch (error) {
      toast.error(`${error?.data?.error}`);
    }
  };
  return (
    <Table striped hover responsive className="table-sm">
      <thead>
        <tr>
          <th>ID</th>
          <th>DATE</th>
          <th>TOTAL</th>
          <th>PAID</th>
          <th>DELIVERED</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr>
            <td>{order._id}</td>
            <td>{order.createdAt.substring(0, 10)}</td>
            <td>{rupee.format(order.totalPrice)}</td>
            <td>
              {order.isPaid ? (
                order.paidAt?.substring(0, 10)
              ) : (
                <FaTimes style={{ color: "red" }} />
              )}
            </td>
            <td>
              {order.isDelivered ? (
                order.deliveredAt?.substring(0, 10)
              ) : (
                <>
                  <FaTimes style={{ color: "red" }} />
                  {admin && (
                    <Button
                      className="btn btn-sm btn-light ms-2"
                      onClick={() => deliveryHandler(order._id)}
                    >
                      Mark as delivered
                    </Button>
                  )}
                  {deliveryLoading && <Loader />}
                </>
              )}
            </td>
            <td>
              <LinkContainer to={`/orders/${order._id}`}>
                <Button type="button" className="btn btn-light btn-sm">
                  Detials
                </Button>
              </LinkContainer>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default OrdersList;
