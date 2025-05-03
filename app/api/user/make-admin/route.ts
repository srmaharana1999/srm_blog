import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(request:NextRequest) {
    try{
        const session = await getServerSession(authOptions);

        if (!session || !session.user || !session.user.isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const {email} = await request.json();
        const formatedEmail = email.trim().toLowerCase();

        
        
        await dbConnect();
        const user = await User.findOne({email:formatedEmail});

        if(!user){
            return NextResponse.json(
                        {error:"This user does not exist!"},
                        {status:400}
                    )
        }

        const updatedUser = await User.findOneAndUpdate({email:formatedEmail},{
           $set: {isAdmin:true}
        },{new:true})
        const {_id,username,email:userEmail,isAdmin}= updatedUser;

        return NextResponse.json(
            {message:"User promoted to admin successfully",user:{_id,username,userEmail,isAdmin}},
            {status:201}
        )
    }catch(error){
        if(error instanceof Error){
            return NextResponse.json({error:error.message},{status:500})
        }else{
            return NextResponse.json(
                {error:"Failed to promote User"},
                {status:500}
            )
        }
    }
}