import { useState } from "react";
import { Button } from "./ui/button";

interface Comment {
  id: number;
  author: string;
  date: string;
  content: string;
}

const Comments = () => {

  const [comment, setComment] = useState<string>("")
  const [comments, setComments] = useState<Comment[]>([])

  const handleChange = (e) => {
    setComment(e.target.value)
  }

  const handleSubmit = () => {
    if(comment.trim()){
      const newComment = {
        id : comments.length + 1,
        author : "Uday Pandey",
        date : new Date().toLocaleDateString(),
        content : comment
      }
      setComments([newComment, ...comments])
      setComment("")
    }
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-semibold text-gray-500">Comments</h1>
      <div className="flex flex-row mr-8 gap-6 justify-center items-center">
        <textarea
          name="comment"
          className="border w-full p-3 mt-5"
          placeholder="Enter your comment"
          value={comment}
          onChange={handleChange}
        />
        <Button className="bg-rose-600/70 hover:bg-rose-600/90 rounded-xl" onClick={handleSubmit}>
          Send
        </Button>
      </div>
      <div className="mt-5">
        {comments.map((comment) => (
          <div key={comment.id} className="mt-6">
            <div className="text-lg font-medium">
              <p>{comment.author}</p>
              <p className="text-sm font-light">{comment.date}</p>
            </div>
            <div className="mt-1">
              {comment.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
