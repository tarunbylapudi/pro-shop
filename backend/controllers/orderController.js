import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/OrderModel.js";
import errorResponse from "../utils/errorResponse.js";
import Product from "../models/ProductModel.js"
import calcPrices from '../utils/calcPrices.js';


//@desc ctreate new order
//@route POST /api/orders
//@access public
export const createOrder = asyncHandler(async (req, res, next) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;

  if (orderItems && orderItems.length === 0) {
    return next(new errorResponse("No order items"), 400);
  }

  // get the ordered items from our database
  const itemsFromDB = await Product.find({
    _id: { $in: orderItems.map((x) => x._id) },
  });

  // map over the order items and use the price from our items from database
  const dbOrderItems = orderItems.map((itemFromClient) => {
    const matchingItemFromDB = itemsFromDB.find(
      (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
    );
    return {
      ...itemFromClient,
      product: itemFromClient._id,
      price: matchingItemFromDB.price,
      _id: undefined,
    };
  });

  // calculate prices
  const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
    calcPrices(dbOrderItems);

  const order = new Order({
    orderItems: dbOrderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();

  res.status(201).json(createdOrder);
});

//@desc get logged in user orders
//@route GET /api/orders/myOrders
//@access private
export const getMyOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  if (orders.length === 0) {
    return next(new errorResponse("No Orders Found!", 404));
  }
  res.status(200).json(orders);
});

//@desc get order by id
//@route GET /api/orders/:id
//@access private
export const getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new errorResponse("No Order Found!", 404));
  }
  res.status(200).json(order);
});

//@desc update order to paid
//@route PUT /api/orders/:id/pay
//@access private/admin
export const updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new errorResponse("No Order Found!", 404));
  }
  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.email_address,
  };

  const updatedOrder = await order.save();

  res.status(200).json(updatedOrder);
});

//@desc update order to delivered
//@route PUT /api/orders/:id/delivered
//@access private/admin
export const updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new errorResponse("No Order Found!", 404));
  }
  order.isDelivered = true;
  order.deliveredAt = Date.now();
  const updatedOrder = await order.save();
  res.status(200).json(updatedOrder);
});

//@desc get all orders
//@route PUT /api/orders/:id/pay
//@access private/admin
export const getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({}).populate("user", "name email");
  if (orders.length === 0) {
    return next(new errorResponse("No Orders Found!", 404));
  }
  res.status(200).json(orders);
});
