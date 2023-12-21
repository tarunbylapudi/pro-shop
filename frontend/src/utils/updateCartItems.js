const updateCartItems = (cartItems, item) => {
    const existItem = cartItems.find((x) => item._id === x._id);
    if (existItem) {
        cartItems = cartItems.map((x) =>
            existItem._id === x._id ? item : x
        );
    } else {
        cartItems = [...cartItems, item];
    }

    return cartItems
}


export default updateCartItems