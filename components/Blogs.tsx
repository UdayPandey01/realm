"use client";

import Image from "next/image";
import thread from "@/assets/IG-Thread.webp";
import { Button } from "./ui/button";
import { IoIosArrowRoundForward } from "react-icons/io";
import Blog from "./Blog";
import CategoryList from "./CategoryList";
import { format } from "date-fns";
import Link from "next/link";
import { useState, useEffect } from "react";

type BlogType = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  category: string;
};

type BlogApiResponse = {
  blogs: BlogType[];
  totalPages: number;
};

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const limit = 5;

  useEffect(() => {
    const fetchBlogs = async (page: number) => {
      const response = await fetch(`/api/blogs/paginated-blogs?page=${page}&limit=${limit}`);
      const data: BlogApiResponse = await response.json();
      setBlogs(data.blogs);
      setTotalPages(data.totalPages);
    };
    fetchBlogs(page);
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="flex flex-col mx-auto px-4 lg:max-w-5xl max-w-xl">
      <div className="text-4xl lg:text-6xl font-semibold mt-10 text-center lg:text-left">
        <span className="text-5xl lg:text-7xl font-bold bg-gradient-to-b from-black to-violet-800/50 text-transparent bg-clip-text">
          Hey, Uday Pandey here!
        </span>{" "}
        Discover my stories and creative ideas
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-6 lg:gap-10">
        <div className="flex justify-center">
          <Image src={thread} alt="thread" width={400} height={400} className="w-full h-auto max-w-xs lg:max-w-md" />
        </div>
        <div className="flex flex-col justify-center gap-6 text-center md:text-left">
          <p className="font-semibold">
            Threads now has 275M monthly active users
          </p>
          <p>
            Meta’s social network, Threads, now has 275 million monthly active users (MAUs), the company said on Sunday. “Yesterday we crossed 275M monthly active users on @Threads. A big thank you to everyone who’s helped us get this far. There’s a lot more to do, and plenty of things to fix, but there’s something exciting about this place,” said Adam Mosseri, the Meta executive who heads Threads and Instagram.
          </p>
          <Button className="flex items-center justify-center w-32 mx-auto md:mx-0 bg-violet-300/50 text-black hover:bg-violet-400/50">
            Read more <IoIosArrowRoundForward className="ml-2" />
          </Button>
        </div>
      </div>

      <CategoryList />

      <div className="mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="col-span-2">
            <p className="text-xl lg:text-2xl font-semibold">Recent Posts</p>
            <div className="flex flex-col gap-6 lg:gap-10 mt-6 lg:mt-10">
              {blogs.map(({ id, title, content, createdAt, category }) => (
                <div key={id} className="flex flex-col gap-2 border-b pb-4">
                  <p className="text-sm">
                    {format(new Date(createdAt), "dd MMMM, yyyy")} -{" "}
                    <span className="text-rose-600">{category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}</span>
                  </p>
                  <p className="font-semibold text-lg lg:text-xl mt-2">{title}</p>
                  <p className="mt-4 text-sm lg:text-base">{content.slice(0, 100)}...</p>
                  <Link href={`/blog/${id}`}>
                    <p className="font-semibold underline mt-4">Read More</p>
                  </Link>
                </div>
              ))}
            </div>
            
            <div className="pagination mt-8 mb-8 flex justify-between items-center">
              <Button
                onClick={handlePreviousPage}
                disabled={page === 1}
                className="px-3 py-1 bg-rose-600/90 w-20 hover:bg-rose-600/60 rounded"
              >
                Previous
              </Button>
              <span>
                Page {page} of {totalPages}
              </span>
              <Button
                onClick={handleNextPage}
                disabled={page === totalPages}
                className="px-3 py-1 bg-rose-600/90 hover:bg-rose-600/60 w-20 rounded"
              >
                Next
              </Button>
            </div>
          </div>
          <div className="flex flex-col">
            <p>What&#39;s</p>
            <p className="font-bold mt-1">Most Popular</p>
            <Blog />
            <p className="mt-14">Discover by topics</p>
            <p className="text-xl lg:text-2xl font-bold">Categories</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 mt-8 gap-4">
              {["Style", "Tech", "Fashion", "Culture", "Travel", "Food"].map((category) => (
                <Link key={category} href={`/category/${category.toLowerCase()}`}>
                  <Button className="flex items-center justify-center w-20 text-sm lg:text-base bg-blue-300/50 text-black hover:bg-blue-400/50">
                    {category}
                  </Button>
                </Link>
              ))}
            </div>
            <p className="mt-14">Chosen by the editor</p>
            <p className="text-xl lg:text-2xl font-bold">Editor&#39;s Pick</p>
            <Blog />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
