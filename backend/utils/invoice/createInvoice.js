import fs from "fs";
import PDFDocument from "pdfkit";
import { rupee } from "../index.js";

const createInvoice = () => {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  return doc;


};

export const generateHeader = (doc) => {
  doc
    // .image("logo.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("PRO SHOP", 110, 57)
    .fontSize(10)
    .text("Pro Shop", 200, 50, { align: "right" })
    .text("4-90, Mogalipuram", 200, 65, { align: "right" })
    .text("Visakhapatnam, Andhra Pradesh, 531035", 200, 80, { align: "right" })
    .moveDown();
};

export const generateCustomerInformation = (doc, invoice) => {
  doc.fillColor("#444444").fontSize(20).text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice._id, 150, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text("Email", 50, customerInformationTop + 30)
    .text(invoice.user?.email, 150, customerInformationTop + 30)

    .font("Helvetica-Bold")
    .text(invoice.user?.name, 300, customerInformationTop)
    .font("Helvetica")
    .text(invoice.shippingAddress?.address, 300, customerInformationTop + 15)
    .text(
      invoice.shippingAddress?.city +
        ", " +
        // invoice.shippingAddress?.state +
        // ", " +
        invoice.shippingAddress?.country,
      300,
      customerInformationTop + 30
    )
    .moveDown();

  generateHr(doc, 252);
};

export const generateInvoiceTable = (doc, invoice) => {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Item",
    "",
    "Unit Cost",
    "Quantity",
    "Line Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoice.orderItems?.length; i++) {
    const item = invoice.orderItems[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.name,
      "",
      formatCurrency(item.price),
      item.qty,
      formatCurrency(item.price * item.qty)
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    formatCurrency(invoice.itemsPrice)
  );
  const taxPosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    taxPosition,
    "",
    "",
    "Tax",
    "",
    formatCurrency(invoice.taxPrice)
  );
  const shippingPosition = taxPosition + 20;
  generateTableRow(
    doc,
    shippingPosition,
    "",
    "",
    "Shipping",
    "",
    formatCurrency(invoice.shippingPrice)
  );
  const totalPricePosition = shippingPosition + 20;
  generateTableRow(
    doc,
    totalPricePosition,
    "",
    "",
    "Total",
    "",
    formatCurrency(invoice.totalPrice)
  );

  //   const paidToDatePosition = subtotalPosition + 20;
  //   generateTableRow(
  //     doc,
  //     paidToDatePosition,
  //     "",
  //     "",
  //     "Paid To Date",
  //     "",
  //     formatCurrency(invoice.paid)
  //   );

  //   const duePosition = paidToDatePosition + 25;
  //   doc.font("Helvetica-Bold");
  //   generateTableRow(
  //     doc,
  //     duePosition,
  //     "",
  //     "",
  //     "Balance Due",
  //     "",
  //     formatCurrency(invoice.subtotal - invoice.paid)
  //   );
  doc.font("Helvetica");
};

export const generateFooter = (doc) => {
  doc
    .fontSize(10)
    .text(
      "Payment is due within 15 days. Thank you for your business.",
      50,
      780,
      { align: "center", width: 500 }
    );
};

export const generateTableRow = (
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) => {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
};

export const generateHr = (doc, y) => {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
};

function formatCurrency(price) {
  return "Rs." + price?.toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

export default createInvoice;
