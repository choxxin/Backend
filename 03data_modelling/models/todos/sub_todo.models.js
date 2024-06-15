import mongoose from "mongoose";
import { User } from "./user.models";

const subtodoSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    complete: {
      type: Boolean,
      default: false,
    },
    createBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
// In Mongoose, setting timestamps: true in a schema definition automatically adds two properties to your schema:
// createdAt: Records the date and time when the document was created.
//updatedAt: Records the date and time when the document was last updated.

export const Subtodo = mongoose.model("Subtodo", subtodoSchema);
