import mongoose, { models } from "mongoose";

export interface IPost {
    id?:mongoose.Types.ObjectId;
    title:string;
    content:string;
    featuredImage:string;
    isPublished:boolean;
    owner:mongoose.Schema.Types.ObjectId;
    createdAt?:Date;
    updatedAt?:Date;
}

const postSchema = new mongoose.Schema<IPost>({
    title:{
        type:String,
        required:[true,"Please provide a title for a post."],
    },
    content:{
        type:String,
        required:[true,"Please provide a content for a post."],
        minlength:[10, "Minimum length of content should be 10."]
    },
    featuredImage:{
        type:String,
    },
    isPublished:{
        type:Boolean,
        default:false,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true});


const Post = models?.User || mongoose.model<IPost>("User",postSchema);

export default Post;
