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
import { addToCart, removeFromCart } from "../slices/cartSlice";
import Message from "../components/Message";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const addToCartHandler = (item, qty) => {
    dispatch(addToCart({ ...item, qty }));
  };
  const deleteFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    navigate('/shipping');
  }
  return (
    <Row>
      <Col md={8}>
        <h1 className="mt-4">Shopping Cart</h1>
        {cart.cartItems.length === 0 ? (
          <Message>
            Your cart is empty. 
            <Link to="/">Continue Shopping</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.image} fluid rounded />
                  </Col>
                  <Col md={4}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
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
                  <Col md={2}>
                    <Button variant="light" type="button">
                      <FaTrash
                        onClick={() => deleteFromCartHandler(item._id)}
                      />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
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
