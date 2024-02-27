import { useEffect, useState } from "react";
import FormLayout from "../components/common/layout/FormLayout";
import { Button, Col, Form } from "react-bootstrap";
import CheckoutSteps from "../components/common/elements/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingAddress } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeOrder");
  };

  return (
    <FormLayout>
      <CheckoutSteps step="Payment" />
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="payment" className="my-4">
          <Form.Label as="legend" className="my-2">
            Select Payment Method
          </Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit card"
              name="payment"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" className="btn" variant="primary">
          Place Order
        </Button>
      </Form>
    </FormLayout>
  );
};

export default PaymentPage;
