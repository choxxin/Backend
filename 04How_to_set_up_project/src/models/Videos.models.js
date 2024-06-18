import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
//Timetsamp :true when we need the created at and updated at time
const videoSchema = new mongoose.Schema(
  {
    videoFile: {
      type: String, //cloudinary url
      required: true,
    },
    thumbnail: {
      type: String, //cloudinary url
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate); //view doc there they have addeed this pagibate ibto the plugin what it does that it makes using mongoose eaasier mongoose-paginate-v2 is a pagination library having a page wrapper. The main usage of the plugin is you can alter the return value keys directly in the query itself so that you don't need any extra code for transformation.
export const Video = new mongoose.model("Video", videoSchema);
