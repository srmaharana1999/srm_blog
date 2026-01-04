import BlogSideBar from "@/components/Blogs/SideBar";
import { apiClient } from "@/lib/apiClient";

const blogsPage = async () => {
  const data = await apiClient.getBlogs();
  return <BlogSideBar blogs={data} />;
};

export default blogsPage;
