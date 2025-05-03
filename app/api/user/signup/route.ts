import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest) {
    const adminEmail = "s.r.m.20.3.2018@gmail.com";
    try{
        const {username,email,password,avatarUrl=" ",bio} = await request.json();
        if(!email || !password){
            return NextResponse.json(
                {error:"Email and Password are required."},
                {status:400}
            );
        }

        await dbConnect();

        const existingUser = await User.findOne({email})

        if(existingUser){
            return NextResponse.json(
                {error:"This email is already in use."},
                {status:400}
            )
        }
        const isAdmin = email === adminEmail;
        const newUser = await User.create({email,password,username,avatarUrl,bio,isAdmin});
        return NextResponse.json(
            {message:"User signed up successfully",newUser},
            {status:201}
        )
    }catch(error){
        if(error instanceof Error){
            return NextResponse.json({error:error.message},{status:500})
        }else{
            return NextResponse.json(
                {error:"Failed to register User"},
                {status:500}
            )
        }
    }
}