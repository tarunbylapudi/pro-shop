import React from "react";
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../../slices/authApiSlice";
import { deleteUserFromLocal } from "../../../slices/authSlice";
import { clearCart } from "../../../slices/cartSlice";

import {
  useSaveCartMutation,
  useSaveWishListMutation,
} from "../../../slices/cartApiSlice";
import SearchBox from "../elements/SearchBox";
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  IconButton,
  Menu,
  MenuItem,
  Slide,
  Toolbar,
  Tooltip,
  Typography,
  useScrollTrigger,
} from "@mui/material";

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const settings = ["Profile", "Account", "Dashboard", "Logout"];

  const {
    cartItems,
    totalCartItems,
    paymentMethod,
    shippingAddress,
    wishList,
  } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [logout] = useLogoutMutation();
  const [saveCart, { isLoading: saveCartLoading, error: savecartError }] =
    useSaveCartMutation();
  const [
    saveWishList,
    { isLoading: saveWishListLoading, error: saveWishListError },
  ] = useSaveWishListMutation();

  const logoutHandler = async () => {
    try {
      await saveCart({ cartItems, shippingAddress, paymentMethod }).unwrap();
      await saveWishList({ wishList }).unwrap();
      await logout().unwrap();
      dispatch(deleteUserFromLocal());
      dispatch(clearCart());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header>
        <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>
                <img src={logo} alt="ProShop"></img>
                ProShop
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
            <Navbar.Collapse>
              <Nav className="ms-auto">
                {user && <SearchBox />}
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <FaShoppingCart /> Cart
                    {cartItems.length > 0 && (
                      <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                        {totalCartItems}
                      </Badge>
                    )}
                  </Nav.Link>
                </LinkContainer>
                {user ? (
                  <NavDropdown title={user.name}>
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaUser /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                )}
                {user && user.isAdmin && (
                  <NavDropdown title="Admin">
                    <LinkContainer to="/admin/products">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orders">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/users">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
}

export default Header;
