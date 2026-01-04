import { IPost } from "@/lib/models/Post";
import { useCategoryState } from "@/store/useCategoryStore";
import { useTagState } from "@/store/useTagStore";
import Image from "next/image";
import Link from "next/link";
import { RxAvatar } from "react-icons/rx";
const BlogTile = ({ post }: { post: IPost }) => {
  const { tags } = useTagState();
  const { categories } = useCategoryState();
  const postTags = tags.filter(
    (tag) => tag._id && post.tagIds.includes(tag._id)
  );
  const postCategory = categories.find(
    (cat) => cat._id && String(cat._id) === String(post.categoryId)
  );
  return (
    <div className="group w-full flex flex-col  items-center border-shadow">
      <div className="h-52  w-full   relative bg-white/20 rounded-t-base ">
        <Image
          src={post.featuredImage || "/images/sample_img.jpg"}
          alt="post_image"
          fill
          className="object-fill rounded-t-base "
        />
      </div>
      <div className="bg-white/20 w-full text-black/70 hover:text-black group-hover:bg-white h-full flex-3 rounded-b-base p-2 flex flex-col">
        <p className="text-sm">
          Category: <span className="italic">{postCategory?.catName}</span>
        </p>
        <Link href="">
          <h1 className="text-lg md:text-2xl">{post.title}</h1>
        </Link>

        <p className="line-clamp-2 text-xs">{post.content}</p>
        <Link
          href={""}
          className="italic font-light text-xs hover:text-blue-600 hover:font-medium w-fit"
        >
          Learn More
        </Link>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 my-2">
            {postTags &&
              postTags.map((tag) => (
                <span className="tag shadow-sm" key={String(tag._id)}>
                  {tag.tagName}
                </span>
              ))}
          </div>
          <span className="inline-flex items-center gap-2 ">
            <RxAvatar className="text-2xl cursor-pointer" />
            <p className="italic cursor-pointer">{String(post.ownerId)}</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogTile;
