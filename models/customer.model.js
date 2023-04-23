import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: {
    name: { type: String, required: true },
    long: { type: mongoose.Schema.Types.Point },
    lati: { type: mongoose.Schema.Types.Point },
  },
  order: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});
const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
