import React from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import Orders from "../components/orders/Orders";
import Profile from "../components/profile/Profile";

const UserProfilePage = () => {
  return (
    <>
      <Row className="my-4">
        <Tab.Container id="left-tabs-example" defaultActiveKey="profile">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="profile">Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="orders">Orders</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="profile">
                  <Profile />
                </Tab.Pane>
                <Tab.Pane eventKey="orders">
                  <Orders />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Row>
    </>
  );
};

export default UserProfilePage;
