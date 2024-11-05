import {Button} from "@/components/ui/button"

const CategoryList = () => {
  return (
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
  )
}

export default CategoryList