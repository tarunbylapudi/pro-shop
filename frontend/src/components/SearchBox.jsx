import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKetword] = useState("");
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
    setKetword("");
  };
  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <InputGroup >
        <Form.Control
          type="text"
          placeholder="search..."
          value={keyword}
          onChange={(e) => setKetword(e.target.value)}
          className="mx-1"
        ></Form.Control>
        <Button type="submit" className="btn btn-light">
          Search
        </Button>


      </InputGroup>
    </Form>
  );
};

export default SearchBox;
