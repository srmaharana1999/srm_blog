import dbConnect from "@/lib/dbConnect";
import Tag from "@/lib/models/Tag";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const tags = await Tag.find({}).sort({ createdAt: -1 }).lean().exec();
    console.log("GET Tags", tags);
    if (tags.length === 0 || !tags) {
      return NextResponse.json([], { status: 400 });
    }
    return NextResponse.json(tags, { status: 200 });
  } catch (error) {
    console.log("GET Tags", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : String(error) || "Request to get Tags failed",
      },
      { status: 400 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const reqBody: { tagName: string } = await req.json();

    const newTag = await Tag.create(reqBody);
    console.log("POST Tag", newTag);

    return NextResponse.json(newTag, { status: 200 });
  } catch (error) {
    console.log("POST Tag", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : String(error) || "Request to Create Tag failed",
      },
      { status: 400 }
    );
  }
}
