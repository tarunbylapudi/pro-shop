import React from "react";
import { Col, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { useGetProductsQuery } from "../slices/productSlice";

const HomePage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <h1>isLoading...</h1>
      ) : error ? (
        <p>error</p>
      ) : (
        <>
          <h1 className="mt-3">Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomePage;
