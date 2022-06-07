import React, { useEffect } from "react";
import { Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getStoresPendingCreate } from "../actions/marketActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {Link} from 'react-router-dom'

export default function StoresPendingScreen() {
  const dispatch = useDispatch();
  const marketPendingList = useSelector((state) => state.marketsPending);
  const { error, loading, markets } = marketPendingList;
  useEffect(() => {
    dispatch(getStoresPendingCreate());
  }, []);
  return (
    <>
      <Row>
        {loading ? (
          <Loader />
        ) : (
          <>
            {error ? (
              <Col>
                <Message>{error}</Message>
              </Col>
            ) : (
              <Col>
                <div>
                  <Table striped bordered hover responsive className="table-sm">
                    <thead>
                      <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>user</th>
                        <th>description</th>
                        <th>status</th>
                        <th>ACtion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {markets &&
                        markets.map((m) => (
                          <tr key={m._id}>
                            <td>{m._id}</td>
                            <td>{m.name}</td>
                            <td>{m.user}</td>

                            <td>{m.description}</td>
                            <td>{m.status}</td>
                            <td>
                                <Link to={`store-pending/${m.user}`}>Detai</Link>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </div>
              </Col>
            )}
          </>
        )}
      </Row>
    </>
  );
}
