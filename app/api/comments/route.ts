import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Comment from "@/lib/models/Comment";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const comments = await Comment.find({}).sort({ createdAt: -1 }).lean();

    console.log("GET Comments", comments);
    if (comments.length == 0 || !comments) {
      return NextResponse.json({ data: [] }, { status: 400 });
    }

    return NextResponse.json({ data: comments }, { status: 200 });
  } catch (error) {
    console.log("GET Comments", error);
    return NextResponse.json({
      error:
        error instanceof Error
          ? error.message
          : String(error) || "Request to get Comments failed",
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
    }

    const ownerId = await session.user?.id;

    await dbConnect();
    const reqBody: { message: string } = await req.json();

    if (!reqBody.message) {
      return NextResponse.json(
        { error: "Message must be not empty" },
        { status: 401 }
      );
    }

    const messageData = {
      messageContent: reqBody.message,
      userId: ownerId,
      postId: "6827bdac8044539733e3fadd",
    };
    const newComment = await Comment.create(messageData);
    return NextResponse.json({ data: newComment }, { status: 200 });
  } catch (error) {
    console.log("POST Comments", error);
    return NextResponse.json({
      error:
        error instanceof Error
          ? error.message
          : String(error) || "Request to Create Comment failed",
    });
  }
}
