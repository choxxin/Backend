import mongoose from "mongoose";
import { User } from "./user.models";

const todoSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    complete: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId, //This is a syntax of getting the refernce ftrom other model this expects to get the ref
      ref: "User",
    },
    subTodos: [
      //Arrays of subtodos
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subTodos",
      },
    ],
  },
  { timestamps: true }
);
export const Todo = mongoose.model("Todo", todoSchema);
