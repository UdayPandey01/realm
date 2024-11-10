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
  blog : {
    title : string,
    content : string
    createdAt : Date
  }
}

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [data, setData] = useState<BlogData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/blogs/get-blog/${id}`
        );
        const result = await response.json();
        setData(result);
        console.log(result);
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
        <div className="flex flex-col mx-auto max-w-5xl mt-10">
          <div className="grid grid-cols-2">
            <div className="h-[340px] flex flex-col justify-between">
              <p className="text-5xl font-semibold mr-6 overflow-hidden text-ellipsis">
                {data.blog.title}
              </p>
              <div>
                <p className="text-lg font-semibold">Uday Pandey</p>
                <p className="text-xs font-medium">{format(new Date(data.blog.createdAt), "dd MMM, yyyy")}</p>
              </div>
            </div>
            <div>
              <Image
                src={thread}
                alt="thread"
                width={500}
                height={500}
                className="rounded-xl"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 mt-8">
            <div className="col-span-2">
              <p className="mr-8">{data.blog.content}</p>
              <div className="mt-10">
                <Comments blogId={id} />
              </div>
            </div>
            <div>
              <Blog />
              <p className="mt-14">Discover by topics</p>
              <p className="text-2xl font-bold">Categories</p>
              <div className="grid grid-cols-3 mt-8 gap-4 ">
                <Button className="flex items-center justify-center w-20 bg-blue-300/50 text-black hover:bg-blue-400/50">
                  Style
                </Button>
                <Button className="flex items-center justify-center w-20 bg-violet-300/50 text-black hover:bg-violet-400/50">
                  Fashion
                </Button>
                <Button className="flex items-center justify-center w-20 bg-blue-300/50 text-black hover:bg-blue-400/50">
                  Food
                </Button>
                <Button className="flex items-center justify-center w-20 bg-violet-300/50 text-black hover:bg-violet-400/50">
                  Travel
                </Button>
                <Button className="flex items-center justify-center w-20 bg-blue-300/50 text-black hover:bg-blue-400/50">
                  Culture
                </Button>
                <Button className="flex items-center justify-center w-20 bg-violet-300/50 text-black hover:bg-violet-400/50">
                  Tech
                </Button>
              </div>
              <p className="mt-14">Choosen by the editor</p>
              <p className="text-2xl font-bold">Editors Pick</p>
              <Blog />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
