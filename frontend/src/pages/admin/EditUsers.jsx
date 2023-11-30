import { Button, Form } from "react-bootstrap";
import FormLayout from "../../components/FormLayout";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetUserByIDQuery,
  useUpdateUserByIDMutation,
} from "../../slices/authApiSlice";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditUsers = () => {
  const { id: userId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { data: user, isLoading, error } = useGetUserByIDQuery(userId);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const [updateUser, { isLoading: updateLoading }] =
    useUpdateUserByIDMutation();

  const navigate = useNavigate();

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin }).unwrap();
      toast.success("User updated successfully");
      navigate("/admin/users")
    } catch (error) {
        toast.error(`${error?.data?.error}`)
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.data.error}</Message>
      ) : (
        <FormLayout>
          <Form onSubmit={updateHandler}>
            <Form.Group controlId="name" className="my-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="email" className="my-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="isAdmin" className="my-2">
              <Form.Check
                type="checkbox"
                id="checkbox"
                label="is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </Form.Group>
            <Button type="submit" className="btn btn-block">
              Update
            </Button>
            {updateLoading && <Loader />}
          </Form>
        </FormLayout>
      )}
    </>
  );
};

export default EditUsers;
