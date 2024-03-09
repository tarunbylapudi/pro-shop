import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/common/elements/Loader";
import Message from "../components/common/elements/Message";
import Meta from "../components/common/layout/Meta";
import Rating from "../components/common/elements/Rating";
import AddReview from "../components/product/AddReview";
import ReviewList from "../components/product/ReviewList";
import { addToCart } from "../slices/cartSlice";
import {
  useAddReviewMutation,
  useGetProductQuery,
} from "../slices/productApiSlice";
import arrayBufferToBase64 from "../utils/arrayBufferToBase64";

const ProductPage = () => {
  const [qty, setQty] = useState(1);

  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductQuery(productId);

  const [addReview, { isLoading: reviewLoading }] = useAddReviewMutation();
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const useSubmitHandler = async (e, rating, comment) => {
    e.preventDefault();
    try {
      await addReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success("Review added successfully!");
    } catch (error) {
      toast.error(`${error?.data?.error}`);
    }
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={5}>
              <Image src={arrayBufferToBase64(product?.img?.data?.data)} alt={product.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>${product.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col className="mt-2">Quantity</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <ReviewList reviews={product.reviews} />
              <>
                <h2>Add a Review</h2>
                {reviewLoading && <Loader />}
                {user ? (
                  <>
                    <AddReview
                      SubmitHandler={useSubmitHandler}
                      loading={reviewLoading}
                    />
                  </>
                ) : (
                  <Message>
                    Please <Link to="/login">login</Link> to write a review
                  </Message>
                )}
              </>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductPage;
