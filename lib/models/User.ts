import bcrypt from "bcryptjs";
import mongoose, { models } from "mongoose";

export interface IUser {
    username :string;
    email:string;
    password:string;
    _id?:mongoose.Types.ObjectId;
    avatarUrl?:string;
    bio?:string;
    isAdmin:boolean;
    isVerified:boolean;
    createdAt?:Date;
    updatedAt?:Date;
}

const userSchema = new mongoose.Schema<IUser>({
    username:{
        type:String,
        required:[true,"Please provide a username."],
        unique:[true,"This username is already taken."],
        trim:true,
    },
    email:{
        type:String,
        required:[true,"Please provide a email."],
        unique:[true,"This email address is already taken."],
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:[true,"Please provide a password."],
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    avatarUrl:{
        type:String,
    },
    bio:{
        type:String,
        maxlength:100,
        trim:true,
    },
    isVerified:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

userSchema.pre("save",async function(next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
})

const User = models?.User || mongoose.model<IUser>("User",userSchema);

export default User;