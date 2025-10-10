import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Post from "@/lib/models/Post";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const posts = await Post.find({}).sort({ createdAt: -1 }).lean();
    console.log("GET POSTS", posts);

    if (posts.length === 0 || !posts) {
      return NextResponse.json({ data: [] }, { status: 400 });
    }

    return NextResponse.json({ data: posts }, { status: 200 });
  } catch (error) {
    console.log("GET POSTS", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : String(error) || "Request to get Posts failed",
      },
      { status: 400 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
    }

    await dbConnect();

    const ownerId = await session.user?.id;

    const reqBody = await req.json();

    const postBody = {
      ...reqBody,
      ownerId,
    };

    const newPost = await Post.create(postBody);
    console.log("POST POSTS", newPost);

    return NextResponse.json({ data: newPost }, { status: 200 });
  } catch (error) {
    console.log("POST POSTS", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : String(error) || "Request to Create Post failed",
      },
      { status: 400 }
    );
  }
}
