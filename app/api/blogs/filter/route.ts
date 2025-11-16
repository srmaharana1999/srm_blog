import Category from "@/lib/models/Category";
import Post from "@/lib/models/Post";
import Tag from "@/lib/models/Tag";
import { NextRequest, NextResponse } from "next/server";

interface RegExpQuery {
  $regex: RegExp | string;
  $options?: string;
}

interface IQuery {
  categoryId?: string;
  tags?: { $in: string[] };
  status?: string;
  title?: RegExpQuery;
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const categorySlug = searchParams.get("categorySlug");
    const tagSlugsParam = searchParams.get("tagSlug");
    const statusParam = searchParams.get("s");
    const titleSearch = searchParams.get("q");

    const query: IQuery = {};

    // Fetch category if categorySlug present
    if (categorySlug) {
      const category = await Category.findOne({
        catSlug: categorySlug.trim().toLowerCase(),
      }).exec();

      if (!category) {
        return NextResponse.json(
          { error: "Category not found" },
          { status: 404 }
        );
      }
      query.categoryId = category._id.toString();
    }

    // Fetch tags if tagSlug(s) present
    if (tagSlugsParam) {
      const tagSlugs = tagSlugsParam
        .split(",")
        .map((slug) => slug.trim().toLowerCase());

      const tags = await Tag.find({ tagSlug: { $in: tagSlugs } }).exec();

      if (!tags.length) {
        return NextResponse.json(
          { error: "No matching tags found" },
          { status: 404 }
        );
      }

      const tagIds = tags.map((tag) => tag._id.toString());
      query.tags = { $in: tagIds };
    }

    // Filter by status if provided
    if (statusParam) {
      query.status = statusParam.trim().toLowerCase();
    }

    // Regex search on post title if q parameter provided
    if (titleSearch) {
      query.title = {
        $regex: new RegExp(titleSearch.trim(), "i"),
      };
    }

    // Query posts based on built query
    const posts = await Post.find(query)
      .populate("categoryId")
      .populate("tags")
      .exec();

    if (posts.length === 0 || !posts) {
      return NextResponse.json({ data: [] }, { status: 400 });
    }

    return NextResponse.json({ data: posts }, { status: 200 });
  } catch (error) {
    console.error("POST-FILTER GET", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : String(error) || "Failed to filter the Posts",
      },
      { status: 500 }
    );
  }
}
