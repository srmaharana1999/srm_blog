import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Category from "@/models/Category";
import Post from "@/models/Post";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized access." },
        { status: 401 }
      );
    }
    const ownerId = session.user.id;

    await dbConnect();

    const {title,content,featuredImage,isPublished=false,status,categoryId,newCategory} = await req.json();
    
    let finalCategoryId = categoryId;

    if(!categoryId && newCategory){
      const catName = newCategory.trim();
      const catSlug = catName
                          .toLowerCase()   
                          .trim()
                          .replace(/[^a-z0-9\s-]/g, '')       
                          .replace(/\s+/g, '-')               
                          .replace(/-+/g, '-');  
    
      const existing = await Category.findOne({catSlug});

      if(!existing) {
        const newCat = await Category.create({catName});
        finalCategoryId = newCat._id;
      }else{
        finalCategoryId = existing._id;
      }
    }
    
    if(!finalCategoryId){
      return NextResponse.json({error:"Category is required."},{status:400});
    }

    const newPost = await Post.create({title,content,featuredImage,isPublished,status,categoryId:finalCategoryId,ownerId})
    
    return NextResponse.json(
      {
        message: "Post Created Successfully.",
        success: true,
        post: newPost,
      },
      { status: 201 }
    );
  } catch (error:any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}