import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

interface Comment {
  id: number;
  author: { name: string };
  date: string;
  content: string;
}

const Comments = ({ blogId }: { blogId: string }) => {
  const token = localStorage.getItem("authToken");
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (!token) return;
        const response = await fetch(`/api/comments/comments/${blogId}`);
        const data = await response.json();
        setComments(data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [blogId]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    if (comment.trim()) {
      try {
        const response = await fetch(`/api/comments/create-comment/${blogId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: comment }),
        });

        const data = await response.json();
        const newComment = {
          id: data.comment.id,
          author: { name: "Uday Pandey" },
          date: new Date().toLocaleDateString(),
          content: comment,
        };

        setComments([newComment, ...comments]);
        setComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  return (
    <div>
      {token ? (
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
            <Button
              className="bg-rose-600/70 hover:bg-rose-600/90 rounded-xl"
              onClick={handleSubmit}
            >
              Send
            </Button>
          </div>
          <div className="mt-5">
            {comments.map((comment) => (
              <div key={comment.id} className="mt-6">
                <div className="text-lg font-medium">
                  <p>{comment.author.name}</p>
                  <p className="text-sm font-light">{comment.date}</p>
                </div>
                <div className="mt-1">{comment.content}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="Text-xl font-medium">
          <Link href="/login/sign-up">
          Sign-In to Comment
          </Link>

        </p>
      )}
    </div>
  );
};

export default Comments;
