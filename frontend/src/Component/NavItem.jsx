import React, { useEffect } from "react";
import { getCartThunk } from "../redux/Reducer/cart";
import { Link, Route, Routes, Redirect, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Nav, Navbar } from "react-bootstrap";
import MyAccount from "../Screens/MyAccount";
import MyCart from "../Screens/MyCart";
import Menu from "../Screens/Menu";
import Login from "./Login";
import Secret from "./Secret";
import { Testing } from "../data/iconData";
import NotFound from "./NotFound";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import RequireAuth from "./RequireAuth";

export default function NavItem() {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    dispatch(getCartThunk());
  }, [dispatch]);

  return (
    <>
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand as={Link} to={"/menu"}>
              MOBILE UNIVERSE
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="ms-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link as={Link} to={"/menu"}>
                  Menu
                </Nav.Link>
                <Nav.Link as={Link} to={"/secret"}>
                  My Account
                </Nav.Link>
                <Nav.Link as={Link} to={"/myCart"}>
                  <Testing />
                </Nav.Link>
                <p className="cart-amount">{item.length}</p>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div>
        {/* set up screen routes */}
        <ToastContainer />
        <Routes>
          <Route exact path="/menu" element={<Menu />} />
          {/* <Route exact path="/" element={<Menu/>} /> */}
          {/* <Route path="/myAccount" element={<MyAccount/>} />    */}
          <Route path="/" element={<Login />} />
          <Route
            path="/secret"
            element={
              <RequireAuth redirectTo="/">
                <Secret />
              </RequireAuth>
            }
          />
          <Route path="/myCart" element={<MyCart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}
