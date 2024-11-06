import Navbar from "@/components/Navbar";
import Image from "next/image";
import thread from "@/assets/IG-Thread.webp";
import Blog from "@/components/Blog";
import { Button } from "@/components/ui/button";
import Comments from "@/components/Comments";

const Page = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col mx-auto max-w-5xl mt-10">
        <div className="grid grid-cols-2">
          <div className="h-[340px] flex flex-col justify-between">
            <p className="text-5xl font-semibold mr-6 overflow-hidden text-ellipsis">
              Threads now has 275M monthly active users
            </p>
            <div>
              <p className="text-lg font-semibold">Uday Pandey</p>
              <p className="text-xs font-medium">4 October 2024</p>
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
            <p className="mr-8">
              Meta’s social network, Threads, now has 275 million monthly active
              users (MAUs), the company said on Sunday. “Yesterday we crossed
              275M monthly active users on @Threads. A big thank you to everyone
              who’s helped us get this far. There’s a lot more to do, and plenty
              of things to fix, but there’s something exciting about this
              place,” said Adam Mosseri, the Meta executive who heads Threads
              and Instagram. Threads, which launched in July 2023 in a bid to
              capitalize on the millions of users leaving X after Elon Musk
              bought the platform, has rapidly gained users and is now become
              one of the biggest text-first social networks. The platform
              reached the 150 million MAU mark in April and 200 million MAUs in
              August, meaning it has gained 75 million active users in just 3
              months.
            </p>
            <div className="mt-10">
              <Comments/>
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
            <Blog/>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Page;
