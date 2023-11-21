import React, { useEffect, useState } from "react";
import FormLayout from "../components/FormLayout";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/authApiSlice";
import { addUserToLocal } from "../slices/authSlice";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const [login, { isLoading }] = useLoginMutation();

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(addUserToLocal(res));
      navigate("/register");
    } catch (error) {
      toast.error(`${error.error}`);
    }
  };

  return (
    <FormLayout>
      <Form>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="please enter your email!"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            placeholder="please enter your password!"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Button className="btn" onClick={submitHandler}>
          Login
        </Button>
      </Form>
      <Row className="mt-2">
        <Col>
          <Link to={"/register"}>New Customer?</Link>
        </Col>
      </Row>
    </FormLayout>
  );
};

export default LoginPage;
