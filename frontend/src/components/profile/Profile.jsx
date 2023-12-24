import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useUpdateProfileMutation } from "../../slices/authApiSlice";
import { addUserToLocal } from "../../slices/authSlice";
import Loader from "../common/Loader";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isProfileDisabled, setIsProfileDisabled] = useState(true);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const dispatch = useDispatch();
  const updateHandler = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        const profile = await updateProfile({ name, email, password }).unwrap();
        dispatch(addUserToLocal(profile));
        toast.success("Profile updated successfully");
        setIsProfileDisabled(true);
      } catch (error) {
        toast.error(error?.data?.error);
      }
    }
  };
  return (
    <>
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
    </>
  );
};

export default Profile;
