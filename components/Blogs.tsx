import Image from "next/image";
import thread from "@/assets/IG-Thread.webp";
import { Button } from "./ui/button";
import { IoIosArrowRoundForward } from "react-icons/io";

const Blogs = () => {
  return (
    <div className="flex flex-col mx-auto max-w-5xl">
      <div className="text-6xl font-semibold mt-10">
        <span className="text-7xl font-bold bg-gradient-to-b from-black to-violet-800/50 text-transparent bg-clip-text">
          Hey, Uday Pandey here!
        </span>{" "}
        Discover my stories and creative ideas
      </div>
      <div className="grid grid-cols-2 mt-10">
        <div>
          <Image src={thread} alt="thread" width={400} height={400} />
        </div>
        <div className="flex flex-col justify-center gap-6">
          <p className="font-semibold">
            Threads now has 275M monthly active users
          </p>
          <p>
            Meta’s social network, Threads, now has 275 million monthly active
            users (MAUs), the company said on Sunday. “Yesterday we crossed 275M
            monthly active users on @Threads. A big thank you to everyone who’s
            helped us get this far. There’s a lot more to do, and plenty of
            things to fix, but there’s something exciting about this place,”
            said Adam Mosseri, the Meta executive who heads Threads and
            Instagram.
          </p>
          <Button className="flex items-center ustify-center w-32 bg-violet-300/50 text-black hover:bg-violet-400/50">
            Read more <IoIosArrowRoundForward className="ml-2" />
          </Button>
        </div>
      </div>
      <div className="mt-8">
        <p className="text-2xl font-semibold">Popular Categories</p>
        <div className="flex flex-row mt-8 justify-between">
          <Button className="flex items-center ustify-center w-32 bg-blue-300/50 text-black hover:bg-blue-400/50">
            Style
          </Button>
          <Button className="flex items-center ustify-center w-32 bg-violet-300/50 text-black hover:bg-violet-400/50">
            Fashion
          </Button>
          <Button className="flex items-center ustify-center w-32 bg-blue-300/50 text-black hover:bg-blue-400/50">
            Food
          </Button>
          <Button className="flex items-center ustify-center w-32 bg-violet-300/50 text-black hover:bg-violet-400/50">
            Travel
          </Button>
          <Button className="flex items-center ustify-center w-32 bg-blue-300/50 text-black hover:bg-blue-400/50">
            Culture
          </Button>
          <Button className="flex items-center ustify-center w-32 bg-violet-300/50 text-black hover:bg-violet-400/50">
            Tech
          </Button>
        </div>
      </div>
      <div className="mt-10">
        <div className="grid grid-cols-3">
          <div className="col-span-2">
            <p className="text-2xl font-semibold">Recent Posts</p>
            <div className="grid grid-cols-2 gap-10 mt-10">
              <div>
                <Image src={thread} alt="thread" width={400} height={400} />
              </div>
              <div className="flex flex-col justify-center">
                <p>
                  04.10.24 - <span className="text-rose-600">CULTURE</span>
                </p>
                <p className="font-semibold mt-4">
                  Threads now has 275M monthly active users
                </p>
                <p className="mt-6">
                  Meta’s social network, Threads, now has 275 million monthly
                  active users (MAUs), the company said on Sunday.
                </p>
                <p className="font-semibold underline mt-4">Read More</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-20">
            <p>What&#39;s</p>
            <p className="font-bold mt-1">Most Popular</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
