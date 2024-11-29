"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import thread from "@/assets/IG-Thread.webp";
import Blog from "@/components/Blog";
import { Button } from "@/components/ui/button";
import Comments from "@/components/Comments";
import { use, useEffect, useState } from "react";
import { format } from "date-fns";

interface BlogData {
  title: string;
  content: string;
  blog: {
    title: string;
    content: string;
    createdAt: Date;
  };
}

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [data, setData] = useState<BlogData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/blogs/get-blog/${id}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <Navbar />
      {data && (
        <div className="flex flex-col mx-auto max-w-5xl mt-10 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col justify-between">
              <p className="text-3xl md:text-5xl font-semibold mr-6 overflow-hidden text-ellipsis">
                {data.blog.title}
              </p>
              <div>
                <p className="text-lg font-semibold">Uday Pandey</p>
                <p className="text-xs font-medium">
                  {format(new Date(data.blog.createdAt), "dd MMM, yyyy")}
                </p>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <Image
                src={thread}
                alt="thread"
                width={500}
                height={500}
                className="rounded-xl"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2">
              <p className="mr-8">{data.blog.content}</p>
              <div className="mt-10">
                <Comments blogId={id} />
              </div>
            </div>
            <div className="space-y-8">
              <Blog />
              <div>
                <p className="mt-6 text-xl font-bold">Discover by topics</p>
                <p className="text-2xl font-bold mt-1">Categories</p>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {["Style", "Fashion", "Food", "Travel", "Culture", "Tech"].map(
                    (category) => (
                      <Button
                        key={category}
                        className="flex items-center justify-center w-full bg-blue-300/50 text-black hover:bg-blue-400/50"
                      >
                        {category}
                      </Button>
                    )
                  )}
                </div>
              </div>
              <div>
                <p className="mt-6 text-xl font-bold">Chosen by the editor</p>
                <p className="text-2xl font-bold mt-1">Editors Pick</p>
                <Blog />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
