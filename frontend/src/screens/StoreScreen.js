import React, { useEffect, useState } from "react";
import { Button, Col, Table, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMarketInfo } from "../actions/marketActions";
import {
  listProductsStore,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import Loader from "../components/Loader";
import Product from "../components/Product";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

export default function StoreScreen({ history, match }) {
  const id = match.params.id;
  const marketInfo = useSelector((state) => state.market);
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const [max, setMax] = useState("");
  const [min, setMin] = useState("");

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productList = useSelector((state) => state.productList);
  const {
    loading: productLoading,
    error: errorLoading,
    products,
    page,
    pages,
  } = productList;

  const { loading, error, market } = marketInfo;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMarketInfo(id));
  }, [id]);

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProductsStore(keyword, pageNumber, min, max, id));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div>
      {loading && <Loader />}
      <>
        {market ? (
          <Row>
            {market.status === "creating" ? (
              <Col>
                <h1 className="text-center">Your store is being processed</h1>
              </Col>
            ) : (
              <>
                {loading ? (
                  <Loader />
                ) : error ? (
                  <Message variant="danger">{error}</Message>
                ) : (
                  <>
                    <Row className="align-items-center">
                      <Col>
                        <h1>Products</h1>
                      </Col>
                      <Col className="text-right">
                        <Button className="my-3" onClick={createProductHandler}>
                          <i className="fas fa-plus"></i> Create Product
                        </Button>
                      </Col>
                    </Row>
                    <Table
                      striped
                      bordered
                      hover
                      responsive
                      className="table-sm"
                    >
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>NAME</th>
                          <th>PRICE</th>
                          <th>CATEGORY</th>
                          <th>BRAND</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                              <LinkContainer
                                to={`/admin/product/${product._id}/edit`}
                              >
                                <Button variant="light" className="btn-sm">
                                  <i className="fas fa-edit"></i>
                                </Button>
                              </LinkContainer>
                              <Button
                                variant="danger"
                                className="btn-sm"
                                onClick={() => deleteHandler(product._id)}
                              >
                                <i className="fas fa-trash"></i>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Paginate pages={pages} page={page} isAdmin={true} />
                  </>
                )}
              </>
            )}
          </Row>
        ) : (
          <Row>
            <Col>
              <h1>You don't have your store yet, get started now</h1>
              <Link to={`${id}/create`}>
                <Button>Create</Button>
              </Link>
            </Col>
          </Row>
        )}
      </>
    </div>
  );
}
