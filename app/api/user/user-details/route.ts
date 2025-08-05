import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req:NextRequest) {
    try{
       const {searchParams} = new URL(req.url);
       const id = searchParams.get('id');
       
       await dbConnect();

       const userData = await User.findById(id);

       return NextResponse.json(userData,{status:200});
    }catch(error){
        console.log(error);
        throw error;
    }
}