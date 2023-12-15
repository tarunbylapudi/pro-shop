import React from "react";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../slices/productApiSlice";
import { Button, Col, Row, Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Paginate from "../../components/Paginate";

const AdminProductsPage = () => {
  const { pageNumber } = useParams();
  const {
    data,
    isLoading: productsLoading,
    error,
    refetch,
  } = useGetProductsQuery({ pageNumber });

  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductMutation();
  const deleteHandler = async (productID) => {
    if (window.confirm("Do you want to delete this product")) {
      try {
        await deleteProduct(productID).unwrap();
        refetch();
        toast.success("product deleted successfully");
      } catch (error) {
        toast.error(`${error?.data?.error}`);
      }
    }
  };
  const [createProduct, { isLoading: addLoading }] = useCreateProductMutation();
  const createHandler = async () => {
    try {
      await createProduct().unwrap();
      refetch();
      toast.success("product added successfully");
    } catch (error) {
      toast.error(`${error?.data?.error}`);
    }
  };

  return (
    <>
      <Row className="my-4">
        <Col>
          <h2>Products</h2>
          {/* <Loader /> */}
        </Col>
        <Col className="text-end">
          <Button className="btn-sm" type="button" onClick={createHandler}>
            <FaEdit className="me-2" />
            Add Product
          </Button>
          {addLoading && <Loader />}
        </Col>
      </Row>
      {productsLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.error}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>BRAND</th>
                <th>CATEGORY</th>
                <th>PRICE</th>
                {/* edit icon */}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>
                    <LinkContainer to={`/admin/products/${product._id}/edit`}>
                      <Button type="button" className="btn btn-light btn-sm">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      type="button"
                      className="btn btn-light btn-sm ms-2"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash />
                    </Button>
                    {deleteLoading && <Loader />}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={data.page} pages={data.pages} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default AdminProductsPage;
