import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorePendingCreate,
  successStorePendingCreate,
} from "../actions/marketActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

export default function StorePendingDetailScreen({ match }) {
  const id = match.params.id;
  const dispatch = useDispatch();
  const marketInfo = useSelector((state) => state.marketPending);
  const { loading, error, market } = marketInfo;
  useEffect(() => {
    dispatch(getStorePendingCreate(id));
  }, [id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(successStorePendingCreate(id));
  };
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {error ? (
            <Message>{error}</Message>
          ) : (
            <Row>
              <Col>
                {market && (
                  <div>
                    <div>
                      <h1>Store name: </h1>
                      <p>{market.name}</p>
                    </div>
                    <div>
                      <h1> Description</h1>
                      <p>{market.description}</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <p>Do you agree to create this store?</p>
                      {market.status == "creating" ? (
                        <Button variant="primary" type="submit">Accept</Button>
                      ) : (
                        <Button variant="warning">Delete</Button>
                      )}
                    </form>
                  </div>
                )}
              </Col>
            </Row>
          )}
        </div>
      )}
    </div>
  );
}
