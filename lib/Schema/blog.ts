import * as Yup from "yup";
import { TAGS } from "../constants";

const isEmptyHTML = (value?: string) => {
  if (!value) return true;
  const stripped = value
    .replace(/<p><\/p>/g, "")
    .replace(/<[^>]*>/g, "") // remove all tags
    .trim();
  return stripped.length === 0;
};

export const postValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required."),
  // slug: Yup.string()
  //   .min(10, "Slug must be at least 10 characters.")
  //   .required("Slug is required."),
  content: Yup.string()
    .min(1, "Content must be at least 1 characters.")
    .required("Content is required.")
    .test(
      "is-not-empty-html",
      "Content cannot be empty.",
      (value) => !isEmptyHTML(value)
    ),

  featuredImage: Yup.string()
    .url("Featured image must be a valid URL.")
    .notRequired(),

  status: Yup.string()
    .oneOf(["draft", "private", "public"], "Invalid status")
    .required("Status is required."),

  allowComments: Yup.boolean().default(true),

  tagIds: Yup.array()
    .of(Yup.string().required("Tag ID is required."))
    .min(1, "At least one tag is required")
    .max(TAGS.MAX_TAGS, `No more than ${TAGS.MAX_TAGS} tags allowed`)
    .required("Tags field is required"),

  // ownerId: Yup.string().required("Owner ID is required."),

  categoryId: Yup.string().required("Category is required."),
});

export type BlogPostType = Yup.InferType<typeof postValidationSchema>;

export const initialBlogPostValues: BlogPostType = {
  title: "",
  // slug: "",
  content: "",
  featuredImage: undefined,
  status: "draft",
  allowComments: true,
  tagIds: [], // Array of tag ObjectIds (as strings)
  // ownerId: "",
  categoryId: "", // Will come from dropdown/select input
};
// export interface BlogPostType {
//   title: string;
//   featuredImage: string;
//   status: "draft" | "private" | "public";
//   allowComments: boolean;
//   content: string;
//   tags: string[];
//   categoryId: string;
// }
