import mongoose from 'mongoose';

export interface ITag{
    id?:mongoose.Types.ObjectId,
    tagName:string,
    tagSlug:string,
    createdAt?:Date;
    updatedAt?:Date;
}

const tagSchema = new mongoose.Schema({
  tagName: {
    type: String,
    required: [true, "Tag name is required"],
    unique: true,
    trim: true,
    maxlength: [30, "Tag name must be less than 30 characters"]
  },
  tagSlug: {
    type: String,
    required: [true, "Slug is required"],
    unique: true,
    trim: true
  },
},{timestamps:true});

tagSchema.pre('validate',async function (next) {
    if(this.tagName && !this.tagSlug){
        const baseSlug = this.tagName
                            .toLowerCase()
                            .trim()
                            .replace(/[^a-z0-9\s-]/g, '')     
                            .replace(/\s+/g, '-')              
                            .replace(/-+/g, '-');  
        this.tagSlug = baseSlug;
    }
    next();
})

export default mongoose.models.Tag || mongoose.model('Tag', tagSchema);
