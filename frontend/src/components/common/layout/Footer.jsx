import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <Container>
        <Row>
          <Col data-testid="text" className="text-center py-3">ProShop &copy; {currentYear}</Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
