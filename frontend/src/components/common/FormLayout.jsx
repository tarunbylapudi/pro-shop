import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const FormLayout = (props) => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6} xs={12}>
          {props.children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormLayout;
