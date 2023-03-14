import mongoose, { Document, Schema } from "mongoose";

export interface Asset extends Document {
  contentType: string;
  fileSize: number;
  filename: string;
  path: string;
}

const assetSchema = new Schema<Asset>(
  {
    contentType: { type: String, required: true },
    fileSize: { type: Number, required: true },
    filename: { type: String, required: true },
    path: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<Asset>("Asset", assetSchema);
