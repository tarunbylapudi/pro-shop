import React, { useEffect } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../slices/orderApiSlice";
import { toast } from "react-toastify";
import { clearCart } from "../slices/cartSlice";

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;
  useEffect(() => {
    // if (cartItems.length === 0) {
    //   navigate("/cart");
    //   return;
    // }
    if (!shippingAddress.address) {
      navigate("/shipping");
      return;
    }
    if (!paymentMethod) {
      navigate("/payment");
      return;
    }
  }, [cartItems, shippingAddress, paymentMethod, navigate]);
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const createOrderHandler = async () => {
    try {
      const order = await createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
      }).unwrap();
      console.log(order, "order");
      dispatch(clearCart());
      navigate(`/orders/${order._id}`);
    } catch (error) {
      toast.error(`${error?.data?.error}`);
    }
  };

  return (
    <>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush" className="my-2">
            <ListGroup.Item>
              <h3>Shipping Address</h3>
              <p>
                <strong>Address : </strong> {shippingAddress.address},{" "}
                {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                {shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Payment Method</h3>
              <p>
                <strong>Payment type : </strong> {paymentMethod}
              </p>
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
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
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
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>shipping Price</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax Price</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total Price</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup.Item>
              <Button
                onClick={createOrderHandler}
                type="button"
                className="btn m-2"
                disabled={cartItems.length === 0}
              >
                Place Order
              </Button>
              {isLoading && <Loader />}
            </ListGroup.Item>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrder;
