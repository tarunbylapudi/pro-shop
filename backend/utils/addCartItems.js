const addCartItems = (DbCartItems, cartItems) => {
    DbCartItems.forEach(item => {
        const existItem = cartItems.find((x) => item.product === x._id);
        if (existItem) {
            DbCartItems = DbCartItems.map((x) =>
                existItem._id === x.product ? item : x
            );
        } else {
            DbCartItems = [...DbCartItems, item];
        }
    });
    return DbCartItems
}


export default addCartItems