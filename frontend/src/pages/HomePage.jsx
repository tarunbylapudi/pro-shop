import React from "react";
import { Col, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { useGetProductsQuery } from "../slices/productSlice";

const HomePage = () => {
  const { data, isLoading, error } = useGetProductsQuery();
  console.log(data,'exp');

  return (
    <>
      <h1 className="mt-3">Latest Products</h1>
      <Row>
        {data.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomePage;
