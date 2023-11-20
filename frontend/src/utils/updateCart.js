export const decimals = (number) => {
  return (Math.round(number * 100) / 100).toFixed(2);
};

const updateCart = (state) => {
  state.itemsPrice = decimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  state.taxPrice = decimals(Number(state.itemsPrice * 0.15));
  state.shippingPrice = decimals(state.itemsPrice > 200 ? 0 : 10);
  state.totalPrice = decimals(
    Number(state.itemsPrice) +
    Number(state.taxPrice) +
    Number(state.shippingPrice)
  );
  state.totalCartItems = state.cartItems.reduce(
    (acc, item) => acc + Number(item.qty),
    0
  );
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};

export default updateCart;
