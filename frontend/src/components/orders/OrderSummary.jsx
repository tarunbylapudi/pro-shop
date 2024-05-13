import React from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { rupee } from "../../utils";

const OrderSummary = ({ order }) => {
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
    </ListGroup>
  );
};

export default OrderSummary;
