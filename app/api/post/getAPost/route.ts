
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";



export async function GET() {
    try{
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json({error:"Unauthorized"},{status:400})
        }
        // console.log(session?.user);
        return NextResponse.json({message:session?.user.email},{status:200})
    }catch(error){
        console.log(error);
    }
}