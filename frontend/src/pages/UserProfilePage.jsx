import React, { useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateProfileMutation } from "../slices/authApiSlice";
import { addUserToLocal } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useGetOrdersQuery } from "../slices/orderApiSlice";
import Loader from '../components/Loader';
import Message from '../components/Message';
import {FaTimes} from 'react-icons/fa'

const UserProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isProfileDisabled, setIsProfileDisabled] = useState(true);
  const {data: orders, isLoading: orderLoading, error} = useGetOrdersQuery();
  const [updateProfile, {isLoading}] = useUpdateProfileMutation();
  const dispatch = useDispatch();
  const updateHandler = async (e) => {
    e.preventDefault();
    if(password===confirmPassword){
        try {
            const profile = await updateProfile({name, email, password}).unwrap()
            dispatch(addUserToLocal(profile))
            toast.success("Profile updated successfully")
            setIsProfileDisabled(true)
        } catch (error) {
            toast.error(error?.data?.error)
        }
    }
  };
  return (
    <>
      <Row>
        <Col md="3">
          <h2 className="my-2">User Profile</h2>
          <Form onSubmit={updateHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isProfileDisabled}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isProfileDisabled}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isProfileDisabled}
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isProfileDisabled}
              />
            </Form.Group>
            {!isProfileDisabled && (
              <Button className="btn-block mt-2" type="submit">
                Update
              </Button>
            )}
            {isLoading && <Loader />}
            {isProfileDisabled && (
              <Button
                className="btn-block mt-2"
                type="button"
                onClick={() => setIsProfileDisabled(false)}
              >
                Edit
              </Button>
            )}
          </Form>
        </Col>
        <Col md="9">
          <h2 className="my-2">Orders</h2>
          {orderLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger"></Message>
          ) : (
            <Table striped hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt?.substring(0,10)
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt?.substring(0,10)
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
};

export default UserProfilePage;
