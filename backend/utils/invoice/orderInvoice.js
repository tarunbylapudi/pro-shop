import createInvoice from "./createInvoice ";
import { invoice } from "./invoice";

const orderInvoice = () => {
  createInvoice(invoice, "invoice.pdf");
};

export default orderInvoice;
