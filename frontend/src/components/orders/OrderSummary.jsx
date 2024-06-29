import React from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { rupee } from "../../utils";
import { Button } from "@mui/material";
import { useGetOrderInvoiceMutation } from "../../slices/orderApiSlice";

const OrderSummary = ({ order }) => {
  const [getInvoice, { isLoading }] = useGetOrderInvoiceMutation();
  const invoiceDownloadHandler = async () => {
    try {
      const response = await getInvoice(order._id).unwrap();
      console.log(response);

      
    } catch (error) {
      console.error("Error downloading invoice:", error);
    }
  };
  return (
    <ListGroup variant="flush">
      <h3 className="px-3 pt-3">Order Summary</h3>
      <ListGroup.Item>
        <Row>
          <Col>Items Price</Col>
          <Col>{rupee.format(order.itemsPrice)}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>shipping Price</Col>
          <Col>{rupee.format(order.shippingPrice)}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>Tax Price</Col>
          <Col>{rupee.format(order.taxPrice)}</Col>
        </Row>
      </ListGroup.Item>

      <ListGroup.Item>
        <Row>
          <Col>Total Price</Col>
          <Col>{rupee.format(order.totalPrice)}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Button onClick={invoiceDownloadHandler} variant="contained">
            Download Invoice
          </Button>
        </Row>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default OrderSummary;
