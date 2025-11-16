import { ICategory } from "./models/Category";
import { IComment } from "./models/Comment";
import { IPost } from "./models/Post";
import { ITag } from "./models/Tag";
import { BlogPostType } from "./Schema/blog";

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
};
class ApiClient {
  private async myFetch<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<T> {
    const { method = "GET", body, headers = {} } = options;
    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };

    const baseUrl = "http://localhost:3000/api";
    const url = baseUrl.concat(endpoint);

    const response = await fetch(url, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response.json();
  }

  async getBlogs() {
    return this.myFetch<IPost[]>("/blogs");
  }

  async getBlog(id: string) {
    return this.myFetch<IPost>(`/blogs/${id}`);
  }

  async createBlog(blogdata: BlogPostType) {
    return this.myFetch<IPost>("/blogs", {
      method: "POST",
      body: blogdata,
    });
  }

  async getCategories() {
    return this.myFetch<ICategory[]>("/categories");
  }

  async createCategory(category: string) {
    const body = { catName: category };
    return this.myFetch<ICategory>("/categories", {
      method: "POST",
      body,
    });
  }

  async getTags() {
    return this.myFetch<ITag[]>("/tags");
  }

  async createTag(tag: string) {
    const body = { tagName: tag };
    return this.myFetch<ICategory>("/tags", {
      method: "POST",
      body,
    });
  }

  async getComments() {
    return this.myFetch<IComment[]>("/comments");
  }
}

export const apiClient = new ApiClient();
