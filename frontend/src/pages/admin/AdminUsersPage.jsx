const AdminUsersPage = () => {
    
  return 
  <>
    <h2 className="my-2">Users</h2>
    {ordersLoading ? (
      <Loader />
    ) : error ? (
      <Message variant="danger">{error.data.error}</Message>
    ) : (
      <Table striped hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr>
              <td>{order._id}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>{order.totalPrice}</td>
              <td>
                {order.isPaid ? (
                  order.paidAt?.substring(0, 10)
                ) : (
                  <FaTimes style={{ color: "red" }} />
                )}
              </td>
              <td>
                {order.isDelivered ? (
                  order.deliveredAt?.substring(0, 10)
                ) : (
                  <>
                    <FaTimes style={{ color: "red" }} />
                    <Button
                      className="btn btn-sm btn-light ms-2"
                      onClick={() => deliveryHandler(order._id)}
                    >
                      Mark as delivered
                    </Button>
                    {deliveryLoading && <Loader />}
                  </>
                )}
              </td>
              <td>
                <LinkContainer to={`/orders/${order._id}`}>
                  <Button type="button" className="btn btn-light btn-sm">
                    Detials
                  </Button>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )}
  </>;
};

export default AdminUsersPage;
