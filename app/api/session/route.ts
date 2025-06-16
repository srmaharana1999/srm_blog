import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req :NextRequest) {
    try {
        const session = await getServerSession(authOptions);
    console.log(session?.user);
    if(!session){
        return NextResponse.json({error:"unauthorized"},{status:400});
    }
    const reqBody = await req.json();
    return NextResponse.json({reqBody},{status:200});
    } catch (error) {
        console.log(error);
    } 
}