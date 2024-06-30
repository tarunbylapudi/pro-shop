import React from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { rupee } from "../../utils";
import { Button } from "@mui/material";
import { useGetOrderInvoiceQuery } from "../../slices/orderApiSlice";
import { ORDERS_URL } from "../../constants";

const OrderSummary = ({ order, orderId }) => {
  // const {
  //   data: orders,
  //   isLoading: ordersLoading,
  //   error,
  //   refetch,
  // } = useGetOrderInvoiceQuery();
  const invoiceDownloadHandler = async () => {
    try {
      const response = await fetch(`${ORDERS_URL}/${orderId}/invoice`, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob(); // Handle the response as a Blob
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice_${orderId}.pdf`; // Set the filename
      document.body.appendChild(a); // Append to body to make it work in Firefox
      a.click();
      a.remove(); // Remove the link after triggering the download

      // Optional: Revoke the object URL after some time
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error("Error downloading invoice:", error);
    }
  };

  return (
    <ListGroup variant="flush">
      <h3 className="px-3 pt-3">Order Summary</h3>
      <ListGroup.Item>
        <Row>
          <Col>Items Price</Col>
          <Col>{rupee.format(order.itemsPrice)}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>shipping Price</Col>
          <Col>{rupee.format(order.shippingPrice)}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>Tax Price</Col>
          <Col>{rupee.format(order.taxPrice)}</Col>
        </Row>
      </ListGroup.Item>

      <ListGroup.Item>
        <Row>
          <Col>Total Price</Col>
          <Col>{rupee.format(order.totalPrice)}</Col>
        </Row>
      </ListGroup.Item>
      {orderId && (
        <ListGroup.Item>
          <Row>
            <Button onClick={invoiceDownloadHandler} variant="contained">
              Download Invoice
            </Button>
          </Row>
        </ListGroup.Item>
      )}
    </ListGroup>
  );
};

export default OrderSummary;
