import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = new Redis({
    url:process.env.UPSTASH_REDIS_REST_URL,
    token:process.env.UPSTASH_REDIS_REST_TOKEN,
  });

export async function POST(req:NextRequest) {
    try{
        const {email,otp} = await req.json();

        if(!email || !otp){
            return NextResponse.json({ message: 'Email and OTP are required' },{status:400})
        }

        const storedOtp = await redis.get(email);
       
        if(!storedOtp){
            return NextResponse.json({ message: 'OTP expired or not found' },{status:400})
        }

        if(String(storedOtp) !== otp){
            return NextResponse.json({ message: `Invalid OTP ${storedOtp} ${otp}` },{status:400})
        }

        await redis.set(`verified:${email}`, true, { ex: 600 });

        await redis.del(email);

        return NextResponse.json({ message: 'OTP verified successfully' },{status:200})
        }catch(error){
        // console.log(error);
        if(error instanceof Error){
            return NextResponse.json({error:error.message},{status:500})
        }else{
            return NextResponse.json(
                {error:'Error verifying OTP'},
                {status:500}
            )
        }
    }
}