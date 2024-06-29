import React from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../components/common/elements/Loader";
import Message from "../components/common/elements/Message";
import OrderItemsList from "../components/orders/OrderItemsList";
import OrderSummary from "../components/orders/OrderSummary";
import { useGetOrderQuery } from "../slices/orderApiSlice";
import Button from '@mui/material/Button';

const OrderPage = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod } = cart;
  const { id } = useParams();
  const { data: order, isLoading, err: orderErr } = useGetOrderQuery(id);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : orderErr ? (
        <Message variant="danger">{orderErr}</Message>
      ) : (
        <>
          <h2 className="my-4">Order {order._id}</h2>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush" className="my-2">
                <ListGroup.Item>
                  <h3>Shipping Address</h3>
                  <p>
                    <strong>Name : </strong> {order.user.name}
                  </p>
                  <p>
                    <strong>Email : </strong> {order.user.email}
                  </p>
                  <p>
                    <strong>Address : </strong> {shippingAddress.address},{" "}
                    {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                    {shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message>
                      Delivered on: {order.deliveredAt?.substring(0, 10)}
                    </Message>
                  ) : (
                    <Message variant="danger">
                      Your order is in Transit!
                    </Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h3>Payment Method</h3>
                  <p>
                    <strong>Payment type : </strong> {paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message>Paid on: {order.paidAt?.substring(0, 10)}</Message>
                  ) : (
                    <Message variant="danger">Not paid!</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h3>Order Items</h3>
                  {!order.orderItems ? (
                    <Message variant="danger">Your Cart is Empty!</Message>
                  ) : (
                    <OrderItemsList items={order.orderItems} />
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              
              <Card className="mt-5">
                <OrderSummary order={order} />
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default OrderPage;
