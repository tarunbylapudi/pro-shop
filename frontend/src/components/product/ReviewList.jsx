import React from "react";
import Message from "../common/elements/Message";
import { ListGroup } from "react-bootstrap";
import Rating from "../common/elements/Rating";

const ReviewList = ({ reviews }) => {
  return (
    <>
      <h2 className="my-3">Reviews</h2>
      {reviews.length === 0 ? (
        <Message>No Reviews Yet!</Message>
      ) : (
        <>
          <ListGroup variant="flush">
            {reviews.map((review, index) => (
              <ListGroup.Item key={index}>
                <strong>{review.name}</strong>
                <Rating value={review.rating}></Rating>
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )}
    </>
  );
};

export default ReviewList;
