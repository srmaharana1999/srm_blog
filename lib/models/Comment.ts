import mongoose, { models } from "mongoose";

export interface IComment {
  _id?: mongoose.Types.ObjectId;
  messageContent: string;
  userId: mongoose.Schema.Types.ObjectId;
  postId: mongoose.Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const commentSchema = new mongoose.Schema<IComment>(
  {
    messageContent: {
      type: String,
      required: [true, "Please provide a valid message for a post."],
      minlength: [10, "Minimum length of content should be 50."],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: true }
);

const Comment =
  models?.Comment || mongoose.model<IComment>("Comment", commentSchema);

export default Comment;
