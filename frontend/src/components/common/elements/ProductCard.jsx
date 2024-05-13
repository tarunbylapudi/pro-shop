import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import arrayBufferToBase64 from "../../../utils/arrayBufferToBase64";
import { rupee } from "../../../utils";

const ProductCard = ({ product }) => {
  return (
    <>
      <Card className="my-3 p-3 rounded">
        <Link to={`/product/${product._id}`}>
          <Card.Img
            src={arrayBufferToBase64(product?.image?.data?.data)}
            style={{
              aspectRatio: "1/1",
              objectFit: "contain",
            }}
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
            <Rating
              value={product.rating}
              text={`${product.numReviews} Reviews`}
            />
          </Card.Text>
          <Card.Text as="h3">{rupee.format(product.price)}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductCard;
