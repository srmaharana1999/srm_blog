import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Post from "@/lib/models/Post";
import { getServerSession } from "next-auth";

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { message: "Id can't be empty" },
        { status: 400 }
      );
    }
    await dbConnect();

    const postData = await Post.findById(id);

    if (!postData) {
      return NextResponse.json(
        { error: "Post id is invalid" },
        { status: 404 }
      );
    }
    console.log("GET A POST", postData);
    return NextResponse.json({ post: postData }, { status: 200 });
  } catch (error) {
    console.log("GET A POST", error);
    return NextResponse.json({
      error:
        error instanceof Error
          ? error.message
          : String(error) || "Request to Get a post failed",
    });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate user session
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user?.id;

    // Extract post ID from params
    const { id: postId } = await params;
    if (!postId) {
      return NextResponse.json(
        { message: "Id can't be empty" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Parse request body
    const reqBody = await req.json();

    // Find the post owned by the user
    const post = await Post.findOne({ _id: postId, ownerId: userId });
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Update post fields
    Object.assign(post, reqBody);

    // Save triggers pre('save') hook where slug will be updated automatically
    const updatedPost = await post.save();

    console.log("Updated post:", updatedPost);
    return NextResponse.json({ post: updatedPost }, { status: 200 });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : String(error) || "Failed to update post",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user?.id;

    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { message: "id can't be empty" },
        { status: 400 }
      );
    }

    await dbConnect();

    const deletedPost = await Post.findOneAndDelete({
      _id: id,
      ownerId: userId,
    });
    // const deletedPost = await Post.deleteOne({ _id: id });

    console.log("DELETE A POST", deletedPost);
    return NextResponse.json({ post: deletedPost }, { status: 200 });
  } catch (error) {
    console.log("DELETE A POST", error);
    return NextResponse.json({
      error:
        error instanceof Error
          ? error.message
          : String(error) || "Request to delete a post failed",
    });
  }
}
