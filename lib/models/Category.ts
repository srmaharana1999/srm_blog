import mongoose, { models } from "mongoose";

export interface ICategory {
  _id?: mongoose.Types.ObjectId;
  catName: string;
  catSlug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const categorySchema = new mongoose.Schema<ICategory>(
  {
    catName: {
      type: String,
      required: [true, "Category name is required."],
      unique: true,
      trim: true,
    },
    catSlug: {
      type: String,
      required: [true, "Category name is required."],
      lowercase: true,
    },
  },
  { timestamps: true }
);

categorySchema.pre("validate", async function (next) {
  if (this.catName && !this.catSlug) {
    const baseSlug = this.catName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    this.catSlug = baseSlug;
  }
  next();
});
const Category =
  models?.Category || mongoose.model<ICategory>("Category", categorySchema);

export default Category;
