import { client, connectRedis } from "@/utils/redis/redis-client";
import transporter from "@/utils/nodemailer/transporter";

const OTPSender = async (email: string) => {
  try {
    await connectRedis();
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await client.setEx(email, 900, otp);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Blog IT-X Signup - OTP Verification",
      text: `Hello,
            Your OTP for signing up is ${otp}.
            Valid for 15 minutes.`,
    });
  } catch (error) {
    const errMessage =
      error instanceof Error
        ? error.message
        : String(error) || "Failed to send message";
    throw new Error(errMessage);
  }
};

export default OTPSender;
