import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    googleId: { type: String },
    email: { type: String },
    image: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    displayName: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("users", UserSchema);
