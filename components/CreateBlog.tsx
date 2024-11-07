"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import CategoryDropdown from "./CategoryDropDown";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("")

  const handlePublish = async(e) => {
    e.preventdefault()

    

    const response = await axios.post("http://localhost:3000/api/blogs/publish-blog",{
      data : {
        title,
        content,
        category,
      }
    })

    console.log(response.data)
  }

  return (
    <div className="flex flex-col">
      <input
        id="title"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        name="content"
        placeholder="Enter your story"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <CategoryDropdown category={category} setCategory={setCategory}/>
      <Button onClick={handlePublish}>
        Publish
      </Button>
      
    </div>
  );
};

export default CreateBlog;
