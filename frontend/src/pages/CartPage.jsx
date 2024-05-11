import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart, addToWishList } from "../slices/cartSlice";
import Message from "../components/common/elements/Message";
import WishListCard from "../components/common/elements/WishListCard";
import arrayBufferToBase64 from "../utils/arrayBufferToBase64";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems, wishList } = cart;
  const addToCartHandler = (item, qty) => {
    dispatch(addToCart({ ...item, qty }));
  };
  const deleteFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const moveToWishListHandler = (item, qty) => {
    dispatch(removeFromCart(item._id));
    dispatch(addToWishList({ ...item, qty }));
  };
  const checkoutHandler = () => {
    navigate("/shipping");
  };
  return (
    <Row>
      <Col md={8}>
        <h1 className="mt-4">Shopping Cart</h1>
        <Row>
          {cart.cartItems.length === 0 ? (
            <Message>
              Your cart is empty.
              <Link to="/">Continue Shopping</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={2}>
                      <Image src={arrayBufferToBase64(item?.image?.data?.data)} alt={item.image} fluid rounded />
                    </Col>
                    <Col md={4}>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={1}>${item.price}</Col>
                    <Col md={1}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) => addToCartHandler(item, e.target.value)}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={1}>
                      <Button variant="light" type="button">
                        <FaTrash
                          onClick={() => deleteFromCartHandler(item._id)}
                        />
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        variant="light"
                        type="button"
                        onClick={() => moveToWishListHandler(item, item.qty)}
                      >
                        Move to WishList
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Row>
        <Row>
          {<h1 className="my-2">Wishlist</h1>}
          {wishList.length === 0 ? (
            <Message> No Items in wishList</Message>
          ) : (
            <ListGroup variant="flush">
              <Row>
                {wishList.map((item, index) => (
                  <Col key={item._id} sm={12} md={6} lg={4} xl={4}>
                    <WishListCard product={item} />
                  </Col>
                ))}{" "}
              </Row>
            </ListGroup>
          )}
        </Row>
      </Col>
      <Col md={4}>
        <Card className="mt-5">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>SubTotal ({cart.totalCartItems}) Items</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>${cart.itemsPrice || 0}</h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn btn-block"
                disabled={cart.cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;
