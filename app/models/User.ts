import mongoose, { Schema, model, models, Document } from "mongoose";

// --- Extend Document so Mongoose knows this is a model instance ---
export interface IUser extends Document {
  username: string;
  password: string; // hashed
  role: "admin" | "user";
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true }
);

// Use existing model if already compiled
const User = models.User || model<IUser>("User", userSchema);

export default User;
