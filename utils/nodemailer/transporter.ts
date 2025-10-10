import { SENDER } from "@/lib/constants";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: SENDER.SERVICE,
  auth: {
    user: SENDER.EMAIL,
    pass: SENDER.PASS,
  },
});

export default transporter;
