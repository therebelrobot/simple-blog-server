import mongoose, { Document, Schema } from "mongoose";
import { Asset } from "./asset.model";

export interface Post extends Document {
  title: string;
  content: string;
  category: string;
  assetId?: Asset["_id"];
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<Post>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    assetId: { type: Schema.Types.ObjectId, ref: "Asset", required: false },
  },
  { timestamps: true }
);

export default mongoose.model<Post>("Post", postSchema);
