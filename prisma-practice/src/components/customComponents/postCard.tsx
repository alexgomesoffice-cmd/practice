import React from "react";
import Link from "next/link";
import { Heart, MessageCircle, Calendar, User } from "lucide-react";

export type Post = {
id: number;
title: string;
article: string;
user: {fullname: string;};
category: {name: string;};
images: {imageUrl: string;}[];
createdAt: string;
_count: {likes: number;comments: number;};};

interface PostCardProps {
post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
    

return ( <article
  className="w-full max-w-sm rounded-xl border"
>
<Link href={`/post/${post.id}`}>
  <div className="relative h-52 w-full overflow-hidden bg-zinc-900">
    {post.images?.[0]?.imageUrl ? (
      <img
        src={post.images[0].imageUrl}
        alt={post.title}
        className="h-full w-full object-cover"
      />
    ) : (
      <div className="flex h-full items-center justify-center">
        No Image
      </div>
    )}
  </div>
</Link>

  <div className="flex flex-1 flex-col p-5">
    <h2 className="line-clamp-2 text-xl font-bold text-foreground">
      <Link
        href={`/post/${post.id}`}
        className="hover:text-zinc-300"
      >
        {post.title}
      </Link>
    </h2>

    <p className="mt-3 line-clamp-4 text-sm leading-7 text-zinc-400">
      {post.article}
    </p>

    <div className="mt-4 flex items-center gap-4 text-sm text-zinc-500">
      <div className="flex items-center gap-1">
        <User size={14} />
        <span>{post.user.fullname}</span>
      </div>

      <div className="flex items-center gap-1">
        <Calendar size={14} />
        <span>
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>

    <div className="mt-auto border-t border-zinc-800 pt-4">
      <div className="flex items-center gap-6 text-sm text-zinc-400">
        <div className="flex items-center gap-2">
          <Heart size={16} />
          <span>{post._count.likes}</span>
        </div>

        <div className="flex items-center gap-2">
          <MessageCircle size={16} />
          <span>{post._count.comments}</span>
        </div>
      </div>
    </div>
  </div>
</article>


);
};

export default PostCard;
