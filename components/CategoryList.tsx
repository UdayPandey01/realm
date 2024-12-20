import { Button } from "@/components/ui/button";
import Link from "next/link";

const CategoryList = () => {
  return (
    <div className="mt-8">
      <p className="text-2xl font-semibold">Popular Categories</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
        <Link href="/category/style">
          <Button className="flex items-center justify-center w-full bg-blue-300/50 text-black hover:bg-blue-400/50">
            Style
          </Button>
        </Link>
        <Link href="/category/tech">
          <Button className="flex items-center justify-center w-full bg-violet-300/50 text-black hover:bg-violet-400/50">
            Tech
          </Button>
        </Link>
        <Link href="/category/fashion">
          <Button className="flex items-center justify-center w-full bg-violet-300/50 text-black hover:bg-violet-400/50">
            Fashion
          </Button>
        </Link>
        <Link href="/category/culture">
          <Button className="flex items-center justify-center w-full bg-blue-300/50 text-black hover:bg-blue-400/50">
            Culture
          </Button>
        </Link>
        <Link href="/category/travel">
          <Button className="flex items-center justify-center w-full bg-violet-300/50 text-black hover:bg-violet-400/50">
            Travel
          </Button>
        </Link>
        <Link href="/category/food">
          <Button className="flex items-center justify-center w-full bg-blue-300/50 text-black hover:bg-blue-400/50">
            Food
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CategoryList;
