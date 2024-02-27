import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import HeadCarosal from "../components/common/elements/HeadCarosal";
import Loader from "../components/common/elements/Loader";
import Message from "../components/common/elements/Message";
import Meta from "../components/common/layout/Meta";
import Paginate from "../components/common/elements/Paginate";
import ProductCard from "../components/common/elements/ProductCard";
import { useGetProductsQuery } from "../slices/productApiSlice";

const HomePage = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    pageNumber,
    keyword,
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          {keyword && (
            <Link className="btn btn-light mt-3" to="/">
              Go Back
            </Link>
          )}
          <HeadCarosal />
          <h1 className="mt-3">Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <ProductCard product={product} />
              </Col>
            ))}
            <Paginate page={data.page} pages={data.pages} keyword={keyword} />
          </Row>
        </>
      )}
    </>
  );
};

export default HomePage;
