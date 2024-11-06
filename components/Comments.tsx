import { Button } from "./ui/button";

const Comments = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-semibold text-gray-500">Comments</h1>
      <div className="flex flex-row mr-8 gap-6 justify-center items-center">
        <textarea
          name="comment"
          className="border w-full p-3 mt-5"
          placeholder="Enter your comment"
        />
        <Button className="bg-rose-600/70 hover:bg-rose-600/90 rounded-xl">
          Send
        </Button>
      </div>
      <div>
        <div className="text-lg font-medium mt-6">
          <p>Uday Pandey</p>
          <p className="text-sm font-light">07.10.24</p>
        </div>
        <div className="mt-1">
          Nice blog! Really enjoyed reading this. Looking forward to more
          content like this!
        </div>
        <div className="text-lg font-medium mt-6">
          <p>Uday Pandey</p>
          <p className="text-sm font-light">07.10.24</p>
        </div>
        <div className="mt-1">
          Nice blog! Really enjoyed reading this. Looking forward to more
          content like this!
        </div>
        <div className="text-lg font-medium mt-6">
          <p>Uday Pandey</p>
          <p className="text-sm font-light">07.10.24</p>
        </div>
        <div className="mt-1">
          Nice blog! Really enjoyed reading this. Looking forward to more
          content like this!
        </div>
      </div>
    </div>
  );
};

export default Comments;
