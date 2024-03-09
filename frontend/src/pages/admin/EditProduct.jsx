import React, { useEffect, useState } from "react";
import FormLayout from "../../components/common/layout/FormLayout";
import { Button, Col, Form, Row } from "react-bootstrap";
import {
  useEditProductMutation,
  useGetProductQuery,
  useImageUploadMutation,
} from "../../slices/productApiSlice";
import Loader from "../../components/common/elements/Loader";
import { toast } from "react-toastify";
import Message from "../../components/common/elements/Message";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);

  const navigate = useNavigate();

  const { id } = useParams();
  const {
    data: getProduct,
    isLoading: getProductLoading,
    error: getProductError,
  } = useGetProductQuery(id);
  const [uploadImage, { isLoading: imageLoading }] = useImageUploadMutation();
  const [editProduct, { isLoading: editProductLoading }] =
    useEditProductMutation();
  const uploadFileHandler = async (e) => {
    try {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      formData.append("productId", id);
      const res = await uploadImage(formData).unwrap();
      setImage(res?.image.replace(/\\/g, "/"));
      toast.success("Image Uploaded successfully");
    } catch (error) {
      toast.error(`${error?.data?.error}`);
    }
  };

  useEffect(() => {
    setName(getProduct?.name || "");
    setCategory(getProduct?.category || "");
    setBrand(getProduct?.brand || "");
    setImage(getProduct?.image || "");
    setCountInStock(getProduct?.countInStock || 0);
    setPrice(getProduct?.price || 0);
    setDescription(getProduct?.description || "");
  }, [getProduct]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await editProduct({
        id,
        body: {
          name,
          category,
          brand,
          image,
          countInStock,
          price,
          description,
        },
      }).unwrap();
      toast.success("Uproduct updated successfully!");
      navigate("/admin/products");
    } catch (error) {
      toast.error(`${error?.data?.error}`);
    }
  };

  return (
    <>
      <Row>
        <Col md={3}>
          <Link to="/admin/products">
            <Button className="btn btn-light mt-2"> Back</Button>
          </Link>
        </Col>
        <Col>
          <h2 className="my-3">Edit Product {id}</h2>
        </Col>
      </Row>

      {getProductLoading ? (
        <Loader />
      ) : getProductError ? (
        <Message variant="danger">{getProductError?.data?.error}</Message>
      ) : (
        <FormLayout>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="category" className="my-2">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="brand" className="my-2">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                className="mb-1"
                type="text"
                placeholder="Image path"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                disabled
              ></Form.Control>
              <Form.Control
                type="file"
                onChange={uploadFileHandler}
              ></Form.Control>
              {imageLoading && <Loader />}
            </Form.Group>
            <Form.Group controlId="price" className="my-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="countInStock" className="my-2">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="count in stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="description" className="my-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="description"
                cols={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" className="btn btn-block">
              save
            </Button>
            {editProductLoading && <Loader />}
          </Form>
        </FormLayout>
      )}
    </>
  );
};

export default EditProduct;
