import React, { useEffect } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/common/elements/Loader";
import Message from "../components/common/elements/Message";
import OrderItemsList from "../components/orders/OrderItemsList";
import OrderSummary from "../components/orders/OrderSummary";
import { clearCart } from "../slices/cartSlice";
import { useCreateOrderMutation } from "../slices/orderApiSlice";
import {
  useGetRzpKayQuery,
  useCheckoutMutation,
  usePaymentVerificationMutation,
} from "../slices/PaymentApiSlice";

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
  const {
    data: razorapyKeyData,
    isLoading: rzpKeyLoading,
    error,
  } = useGetRzpKayQuery();

  const [checkout, { isLoading: checkoutLoading }] = useCheckoutMutation();

  const [paymentVerfication, { isLoading: paymentVerficationLoading }] =
    usePaymentVerificationMutation();

  const createOrderHandler = async () => {
    try {
      const order = await createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
      }).unwrap();

      const rzpOrder = await checkout({ orderID: order._id }).unwrap();

      // console.log(rzpOrder)
      let payment = {};

      const options = {
        key: razorapyKeyData.key,
        amount: rzpOrder.amount,
        currency: "INR",
        name: "Pro Shop",
        description: "Buy Something",
        image: "https://avatars.githubusercontent.com/u/96648429?s=96&v=4",
        order_id: rzpOrder.id,
        handler: async function (response) {
          const res = await paymentVerfication({
            orderID: order._id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          }).unwrap();

          dispatch(clearCart());
          navigate(`/orders/${order._id}`);
        },
        prefill: {
          name: "Tarun Bylapudi",
          email: "tarun@gmail.com",
          contact: "1234567890",
        },
        notes: {
          address: "razorapy official",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
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
                <OrderItemsList items={cartItems} />
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card className="mt-5">
            <OrderSummary order={cart} />
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
