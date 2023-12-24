import React, { useState } from "react";
import { Button, FormControl, Form } from "react-bootstrap";

const AddReview = ({ SubmitHandler, loading }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const submitHandler = async (e) => {
    await SubmitHandler(e, rating, comment);
    setRating("");
    setComment("");
  };
  return (
    <Form onSubmit={submitHandler}>
      <Form.Group controlId="rating">
        <Form.Label>Rating</Form.Label>
        <FormControl
          as="select"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="">Select...</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </FormControl>
      </Form.Group>
      <Form.Group controlId="comment" className="my-2">
        <Form.Label className="my-2">Comment</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="add a comment"
          row={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Button className="btn btn-block" type="submit" disabled={loading}>
        Add
      </Button>
    </Form>
  );
};

export default AddReview;
