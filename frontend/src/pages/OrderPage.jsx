import React from "react";
import { Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Message from "../components/Message";
import { useGetOrderQuery } from "../slices/orderApiSlice";
import Loader from "../components/Loader";

const OrderPage = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;
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
                    <Message>{order.deliveredAt}</Message>
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
                    <Message>{order.paidAt}</Message>
                  ) : (
                    <Message variant="danger">Not paid!</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h3>Order Items</h3>
                  {!cartItems ? (
                    <Message variant="danger">Your Cart is Empty!</Message>
                  ) : (
                    <ListGroup variant="flush">
                      {cartItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                alt={item.image}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link to={`/product/${item._id}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              ${item.price} x {item.qty} = $
                              {(item.price * item.qty).toFixed(2)}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card className="mt-5">
                <ListGroup variant="flush">
                  <h3 className="px-3 pt-3">Order Summary</h3>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items Price</Col>
                      <Col>${order.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>shipping Price</Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax Price</Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Total Price</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default OrderPage;
