import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders, payOrder } from "../actions/orderActions";
import { deliverOrder } from "../actions/orderActions";

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [paymentResult, setPaymentResult] = useState({
    id: "",
    status: "",
    update_time: "",
    payer: {
    email_address: "",
    }
  })

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log()

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const handleDeliverOrder = (order) => {
    dispatch(deliverOrder(order));
  };
  const handleDeliverPaid = (order) => {

    setPaymentResult({
      id:order._id,
      status:"Yes",
      update_time: Date.now(),
      payer:{
        email_address:userInfo.email

      }
    })
    dispatch(payOrder(order._id, paymentResult)).then(()=>{
      setPaymentResult({
        id: "",
        status: "",
        update_time: "",
        payer: {
        email_address: "",
        }
      })
    })
  };
  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i
                      className="fas fa-times"
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() =>
                        handleDeliverPaid(order)
                      }
                    ></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i
                      className="fas fa-times"
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => handleDeliverOrder(order)}
                    ></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
