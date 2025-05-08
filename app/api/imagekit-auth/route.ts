import { getUploadAuthParams } from "@imagekit/next/server";
import { NextResponse } from "next/server";

const imagekit = {
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLICKEY! as string,
  privateKey: process.env.IMAGEKIT_PRIVATEKEY! as string,
//   urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URLENDPOINT!,
};

export async function GET() {
    try{
        const {token,expire,signature} = getUploadAuthParams(imagekit);
        return NextResponse.json({token,expire,signature,publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLICKEY});
    }catch(error){
        console.log(error);
        return NextResponse.json({error:"Imagekit Auth Failed!"},{status:500})
    }
 
}