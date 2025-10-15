"use client";

import CreatePostForm from "@/components/CreatePostForm";

const CreateBlogPage = () => {
  return (
    <div className="mt-25 max-w-5xl w-10/12 lg:w-full mx-auto pb-10">
      <h1 className="text-2xl md:text-4xl mb-6">Create Blog</h1>
      <CreatePostForm />
    </div>
  );
};

export default CreateBlogPage;
