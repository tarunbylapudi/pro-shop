import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { addToCart, removeFromWishList } from "../../../slices/cartSlice";
import { useDispatch } from "react-redux";
import arrayBufferToBase64 from "../../../utils/arrayBufferToBase64";

const WishListCard = ({ product }) => {
  const dispatch = useDispatch();

  const moveToCartHandler = (product, qty, id) => {
    dispatch(removeFromWishList(id));
    dispatch(addToCart({ ...product, qty }));
  };
  const deleteFromWishListHandler = (id) => {
    dispatch(removeFromWishList(id));
  };
  return (
    <>
      <Card className="my-3 p-3 rounded">
        <Link to={`/product/${product._id}`}>
          <Card.Img
            style={{
              aspectRatio: "1/1",
              objectFit: "contain",
            }}
            src={arrayBufferToBase64(product?.img?.data?.data)}
            variant="top"
          ></Card.Img>
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as="div" className="product-title">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>

          <Card.Text as="div">
            {product.qty <= product.countInStock ? "In Stock" : "Out of Stock"}
          </Card.Text>
          <Card.Text as="h3">${product.price}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Row>
            <Col>
              <Button variant="light" type="button">
                <FaTrash
                  onClick={() => deleteFromWishListHandler(product._id)}
                />
              </Button>
            </Col>
            <Col>
              <Button
                variant="light"
                type="button"
                onClick={() =>
                  moveToCartHandler(product, product.qty, product._id)
                }
              >
                Move to Cart
              </Button>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </>
  );
};

export default WishListCard;
