"use client";

import TextField from "../Inputs/TextField";
import { Form, Formik, FormikHelpers } from "formik";
import ImageUpload from "../ImageUpload";
import { SimpleEditor } from "../TipTapRTE/tiptap-templates/simple/simple-editor";
import {
  BlogPostType,
  initialBlogPostValues,
  postValidationSchema,
} from "@/lib/Schema/blog";
import { Button } from "../ui/button";
import AdvancedTagInput from "./TagInput";
import CategoryInput from "./CategoryInput";
import { useState } from "react";
import { UploadResponse } from "@imagekit/next";
import StatusSelector from "./StatusSelector";
import { Loader2Icon } from "lucide-react";
import { apiClient } from "@/lib/apiClient";
import { useCategoryState } from "@/store/useCategoryStore";
import { useTagState } from "@/store/useTagStore";

const CreateBlogPostForm = () => {
  const [blogImage, setBlogImage] = useState<UploadResponse>();
  const { categories } = useCategoryState();
  const { tags } = useTagState();
  const handleBlogSubmit = async (
    values: BlogPostType,
    formikHelpers: FormikHelpers<BlogPostType>
  ) => {
    const categoryObj = await categories.find((cat) =>
      cat.catName.toLowerCase().includes(values.categoryId.toLowerCase())
    );
    const tagIds = await tags
      .map((tagObj) =>
        values.tagIds.includes(tagObj.tagName) ? String(tagObj._id) : undefined
      )
      .filter((id): id is string => typeof id === "string");
    try {
      const response = await apiClient.createBlog({
        title: values.title,
        featuredImage: blogImage?.url || "",
        content: values.content,
        status: values.status,
        tagIds: Array.from(tagIds),
        categoryId: String(categoryObj?._id),
        allowComments: true,
      });
      console.log("handleBlogSubmit", response);
    } catch (error) {
      console.log("handleBlogSubmit", error);
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };
  return (
    <Formik
      initialValues={initialBlogPostValues}
      validationSchema={postValidationSchema}
      onSubmit={handleBlogSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="w-full space-y-8">
          <div>
            <h2 className="text-xl">Title:</h2>
            <p className="text-xs text-chart-5 mb-2">
              Enter a catchy and descriptive title for your post.
            </p>
            <TextField
              name="title"
              type="text"
              placeholder="Enter descriptive title for your blog post"
            />
          </div>
          <div>
            <h2 className="text-xl">Featured Image:</h2>
            <p className="text-xs text-chart-5 mb-2">
              Upload a main image that represents your post.
            </p>
            <div className="h-96">
              <ImageUpload onSuccess={setBlogImage} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-16">
            <div className="md:col-span-3 flex flex-col justify-between">
              <CategoryInput name="categoryId" />
              <AdvancedTagInput name="tagIds" />
            </div>
            <div className="md:col-span-2">
              <StatusSelector name="status" />
            </div>
          </div>
          <div>
            <h3 className="text-xl">Content:</h3>
            <p className="text-xs text-chart-5 mb-2">
              Write the full content of your post here.
            </p>

            <SimpleEditor name="content" />
          </div>

          <Button className=" text-lg w-full">
            {isSubmitting ? <Loader2Icon className="animate-spin" /> : "Submit"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateBlogPostForm;
