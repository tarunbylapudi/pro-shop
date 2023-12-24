import {
  useDeleteUserByIDMutation,
  useGetAllUsersQuery,
} from "../../slices/authApiSlice";
import React from "react";
import { Button, Table } from "react-bootstrap";
import Loader from "../../components/common/Loader";
import Message from "../../components/common/Message";
import { LinkContainer } from "react-router-bootstrap";
import { FaEdit, FaTimes, FaCheck, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const AdminUsersPage = () => {
  const { data: users, isLoading, error, refetch } = useGetAllUsersQuery();
  const [deleteUser, { isLoading: deleteLoading }] =
    useDeleteUserByIDMutation();

  const deleteHandler = async (userId) => {
    if (window.confirm("Do you want to delete this User?")) {
      try {
        await deleteUser(userId).unwrap();
        refetch();
        toast.success("user deleted successfully!");
      } catch (error) {
        toast.error(`${error?.data?.error}`);
      }
    }
  };
  return (
    <>
      <h2 className="my-2">Users</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.data.error}</Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>IS ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>

                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>

                <td>
                  <LinkContainer to={`/admin/users/${user._id}/edit`}>
                    <Button type="button" className="btn btn-light btn-sm">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    type="button"
                    className="btn btn-light btn-sm ms-2"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <FaTrash />
                  </Button>
                  {deleteLoading && <Loader />}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default AdminUsersPage;
