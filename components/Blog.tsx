"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Blog {
  title: string;
  image: string | null;
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date | null;
  likes: number;
  published: boolean;
  authorId: string;
  category: string;
  author: {
    id: string;
    name : string,
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}

const BlogComponent = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs/three-blogs");
        const data = await response.json();
        setBlogs(data.blogs);
        
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <p className="bg-rose-600/70 w-20 text-center p-1 rounded-xl text-white mt-4">
            {blog.category.charAt(0).toUpperCase() + blog.category.slice(1).toLowerCase()}
          </p>
          <Link href={`/blog/${blog.id}`}>
          <p className="mt-2 font-medium">{blog.title}</p>
          </Link>
          <div className="text-xs mt-1 font-semibold">
            <p>
              {blog.author.name} -{" "}
              <span className="text-gray-500">
                {new Date(blog.createdAt).toLocaleDateString()}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogComponent;
