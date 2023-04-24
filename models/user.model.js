import mongoose from "mongoose";
import bcrypt from "bcrypt";
const sellerSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  phone: { type: String },
  role: { type: String, default: "seller" },
  logo: {
    type: String,
    default: `https://previews.123rf.com/images/distrologo/distrologo1902/distrologo190200778/117610020-retail-store-logo-design-template-shopping-cart-logo-icon-design.jpg`,
  },
  password: { type: String, required: true },
  address: {
    name: { type: String },
    long: { type: String },
    lati: { type: String },
  },
  status: { type: String, default: "normal" },
  enable: { type: Boolean, default: true },
  product: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});
sellerSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
sellerSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
const Seller = mongoose.model("Seller", sellerSchema);

export default Seller;
