import { Redis } from "@upstash/redis";
import nodemailer from "nodemailer";

interface IgenerateAndSendOTPProps{
    email:string;
}

interface IverifyotpProps{
    email:string;
    otp:string;
}
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

export async function generateAndSendOTP(props:IgenerateAndSendOTPProps) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await redis.setex(props.email,600,otp);

    await transporter.sendMail({
        from:process.env.EMAIL_USER,
        to:props.email,
        subject:'SRM Blog Signup - OTP Verification',
        text:
        `Hello,
            Your OTP for signing up is ${otp}.
            Valid for 10 minutes.`
    })
    return otp;
}

export async function verifyOtp(props:IverifyotpProps) {
    const storedOtp = await redis.get(props.email);

    if(!storedOtp) return false;

    if(storedOtp !== props.otp) return false;

    await redis.del(props.email);
    
}
