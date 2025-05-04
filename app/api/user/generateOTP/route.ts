import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const redis = new Redis({
    url:process.env.UPSTASH_REDIS_REST_URL,
    token:process.env.UPSTASH_REDIS_REST_TOKEN,
  });

const transporter = nodemailer.createTransport(
    {
        service:"gmail",
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        },
    });

export async function POST(req:NextRequest) {
    try{
        const {email} = await req.json();

        if(!email) {
            return NextResponse.json({ message: 'Email is required' },{status:400})
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        await redis.setex(email,600,otp);

        await transporter.sendMail({
        from:process.env.EMAIL_USER,
        to:email,
        subject:'SRM Blog Signup - OTP Verification',
        text:
        `Hello,
            Your OTP for signing up is ${otp}.
            Valid for 10 minutes.`
    })
    return NextResponse.json({ message: `OTP${otp} sent to email` },{status:200})
    }catch(error){
        console.log(error);
        if(error instanceof Error){
            return NextResponse.json({error:error.message},{status:500})
        }else{
            return NextResponse.json(
                {error:'Error generating OTP'},
                {status:500}
            )
        }
    }
    
}
