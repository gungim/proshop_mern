import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import CategoryListScreen from "./screens/CategoryListScreen";
import CreateCategory from "./screens/CreateCategory";
import StoreScreen from "./screens/StoreScreen";
import CreateStoreScreen from "./screens/CreateStoreScreen";
import StoresPendingScreen from "./screens/StoresPendingScreen";
import StorePendingDetailScreen from "./screens/StorePendingDetailScreen";
import MyOrder from "./screens/MyOrder"
const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route path="/page/:pageNumber" component={HomeScreen} exact />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomeScreen}
            exact
          />

          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/store/:id" component={StoreScreen} exact />
          <Route path="/store/:id/create" component={CreateStoreScreen} exact />

          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route
            path="/admin/productlist"
            component={ProductListScreen}
            exact
          />
          <Route
            path="/admin/productlist/:pageNumber"
            component={ProductListScreen}
            exact
          />
          <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
          <Route path="/admin/orderlist" component={OrderListScreen} />
          <Route
            path="/admin/categories"
            component={CategoryListScreen}
            exact
          />
          <Route
            path="/admin/categories/create"
            component={CreateCategory}
            exact
          />

          <Route
            path="/admin/store-pending"
            component={StoresPendingScreen}
            exact
          />
          <Route
            path="/admin/store-pending/:id"
            component={StorePendingDetailScreen}
            exact
          />
          <Route path="/my-order/:id" component={MyOrder} exact/>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
