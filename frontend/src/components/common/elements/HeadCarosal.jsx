import React from "react";
import { Carousel, Image } from "react-bootstrap";
import { useGetTopRatedProductsQuery } from "../../../slices/productApiSlice";
import Loader from "./Loader";
import Message from "./Message";
import { Link } from "react-router-dom";
import arrayBufferToBase64 from "../../../utils/arrayBufferToBase64";
import { rupee } from "../../../utils";

const HeadCarosal = () => {
  const { data, isLoading, error } = useGetTopRatedProductsQuery();
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.error}</Message>
      ) : (
        <Carousel pause="hover" className="bg-primary my-4">
          {data.map((item) => (
            <Carousel.Item key={item._id} >
              <Link to={`/product/${item._id}`} className="d-flex  justify-content-center">
                <Image width={400} height={50} src={arrayBufferToBase64(item?.image?.data?.data)} fluid />
                <Carousel.Caption className="carousel-caption">
                  <h3>
                    {item.name} ({rupee.format(item.price)})
                  </h3>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default HeadCarosal;
