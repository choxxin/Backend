import mongoose, { model } from "mongoose";
const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    addressLine1: {
      type: String,
      required: true,
    },
    addressLine2: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },

    //Array of specilaisation in which there can be property stroed only string type
    specialisedIn: [
      {
        type: String,
      },
    ],
  },

  { timestamps: true }
);

export const Hospital = new mongoose.model("Hospital", hospitalSchema);
