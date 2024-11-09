"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import CategoryDropdown from "./CategoryDropDown";
import { useRouter } from "next/navigation";

const CreateBlog = () => {
  const router = useRouter();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  
  const handlePublish = async (e: React.MouseEvent<HTMLButtonElement>) => {


    e.preventDefault();

    const token = localStorage.getItem("authToken");

    console.log("Token", token);
    const response = await axios.post(
      "http://localhost:3000/api/blogs/publish-blog",
      {
        data :{title,
        content,
        category,}
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
    );

    if(response.status == 200){
      router.push("/")
    }

    console.log(response.data);
  };

  return (
    <div className="flex flex-col">
      <input
        id="title"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-4 text-4xl font-medium"
      />
      <textarea
        name="content"
        placeholder="Enter your story"
        value={content}
        className="border p-4 mt-5 font-medium"
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="mt-5">
        <CategoryDropdown category={category} setCategory={setCategory} />
      </div>
      <Button onClick={handlePublish} className="w-16 mt-8 ml-2">
        Publish
      </Button>
    </div>
  );
};

export default CreateBlog;
