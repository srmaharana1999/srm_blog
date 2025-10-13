"use client";

import CreatePostForm from "@/components/CreatePostForm";

const CreateBlogPage = () => {
  return (
    <div className="mt-25 max-w-7xl mx-auto">
      <h1 className="text-2xl">Create Blog</h1>
      <CreatePostForm />
    </div>
  );
};

export default CreateBlogPage;
