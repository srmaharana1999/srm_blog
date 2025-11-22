import mongoose, { models } from "mongoose";

export interface IPost {
  _id?: mongoose.Types.ObjectId;
  title: string;
  content: string;
  slug: string;
  featuredImage: string;
  status: string;
  allowComments?: boolean;
  tagIds: mongoose.Types.ObjectId[];
  ownerId: mongoose.Schema.Types.ObjectId;
  categoryId: mongoose.Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const postSchema = new mongoose.Schema<IPost>(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for a post."],
    },
    content: {
      type: String,
      required: [true, "Please provide a content for a post."],
      minlength: [2, "Minimum length of content should be 50."],
    },
    slug: {
      type: String,
      required: [true, "Please provide a valid slug."],
      unique: true,
      minlength: [2, "Minimum length of content should be 10."],
    },
    featuredImage: {
      type: String,
    },
    status: {
      type: String,
      enum: ["public", "private", "draft"],
      default: "draft",
    },
    allowComments: {
      type: Boolean,
      default: true,
    },
    tagIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

postSchema.pre("validate", async function (next) {
  if (this.title && !this.slug) {
    const baseSlug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // remove special chars
      .replace(/\s+/g, "-") // replace spaces with dashes
      .replace(/-+/g, "-"); // collapse repeated dashes
    let slug = `0-${baseSlug}`;
    let count = 1;

    while (await mongoose.models.Post.exists({ slug })) {
      slug = `${count}-${baseSlug}`;
      count++;
    }
    this.slug = slug;
  }

  next();
});
const Post = models?.Post || mongoose.model<IPost>("Post", postSchema);

export default Post;
