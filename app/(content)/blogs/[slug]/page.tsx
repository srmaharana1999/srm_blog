const BlogPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return <div className="mt-25 text-3xl">{slug}</div>;
};

export default BlogPage;
