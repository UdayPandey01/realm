"use client";

import React, { use, useEffect, useState } from "react";

interface Blog {
  id: string;
  title: string;
  content: string;
}

const CategoryPage = ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = use( params);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    if (category) {
      fetchBlogs(category);
    }
  }, [category]);
  
  const fetchBlogs = async (category: string) => {
    try {
      console.log("category", category)
      const response = await fetch(`/api/blogs/cat-blog/${category}`);
      const data = await response.json();
      setBlogs(data.blog || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  return (
    <div className="mt-8">
      <h1 className="text-3xl font-semibold">Category: {category}</h1>

      <ul className="mt-4 space-y-4">
        {blogs.map((blog) => (
          <li key={blog.id} className="p-4 border rounded">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p>{blog.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;
