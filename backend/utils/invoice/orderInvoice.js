import createInvoice from "./createInvoice.js";
import { invoice } from "./invoice.js";

const orderInvoice = () => {
  createInvoice(invoice, "invoice.pdf");
};

export default orderInvoice;
