import React from "react";
import { Col, Image, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import arrayBufferToBase64 from "../../utils/arrayBufferToBase64";

const OrderItemsList = ({ items }) => {
  return (
    <>
      <ListGroup variant="flush">
        {items.map((item, index) => (
          <ListGroup.Item key={index}>
            <Row>
              <Col md={1}>
                <Image
                  src={arrayBufferToBase64(item?.img?.data?.data)}
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
    </>
  );
};

export default OrderItemsList;
