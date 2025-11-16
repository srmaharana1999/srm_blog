import dbConnect from "@/lib/dbConnect";
import Category from "@/lib/models/Category";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const categories = await Category.find({}).sort({ createdAt: -1 }).lean();
    console.log("GET Categories", categories);
    if (categories.length === 0 || !categories) {
      return NextResponse.json([], { status: 400 });
    }
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.log("GET Categories", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : String(error) || "Request to get Categories failed",
      },
      { status: 400 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const reqBody: { catName: string } = await req.json();

    if (!reqBody.catName) {
      return NextResponse.json(
        { error: "Category field empty" },
        { status: 401 }
      );
    }

    const newCategory = await Category.create(reqBody);
    console.log("POST Categories", newCategory);

    return NextResponse.json(newCategory, { status: 200 });
  } catch (error) {
    console.log("POST Categories", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : String(error) || "Request to Create Category failed",
      },
      { status: 400 }
    );
  }
}
