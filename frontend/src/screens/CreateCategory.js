import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { createCategory } from "../actions/categoryActions";
import { CATEGORY_CREATE_GET } from "../constants/categoryConstants";

const CreateCategory = ({ history }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const category = useSelector((state) => state.categoryCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = category;
  const dispatch = useDispatch();
  console.log(successCreate)

  useEffect(() => {
    dispatch({ type: CATEGORY_CREATE_GET })
    if (successCreate) {
      history.push("/admin/categories");
    }
  }, [successCreate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createCategory({
        name,
        description,
      })
    );
  };

  return (
    <>
      <Link to="/admin/categories" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant="danger">{errorCreate}</Message>}
        <h1>Create Category</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default CreateCategory;
