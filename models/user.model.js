import mongoose from "mongoose";
import bcrypt from "bcrypt";
const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  role: { type: String, default: "user" },
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
UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
UserSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
const User = mongoose.model("User", UserSchema);

export default User;
