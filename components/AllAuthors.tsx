"use client"

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";

interface Blog {
  id : string
  title: string;
  content: string;
}

interface Author {
  name: string;
  blogs: Blog[];
}

const MyComponent = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/authors/get-authors");
      const data = await response.json();

      if (Array.isArray(data.author)) {
        setAuthors(data.author);
      } else {
        console.error("Expected 'author' to be an array, but got:", data.author);
      }
    } catch (error) {
      console.error("Error fetching authors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async(id : string) =>{
    try {
        const response = await axios.delete(`http://localhost:3000/api/blogs/del-author-blog/${id}`)
        console.log(response)
        await fetchUsers()
      } catch{
        console.log('Error deleting blog:');
      }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {loading ? (
        <div className="text-center text-xl text-gray-600">Loading authors...</div>
      ) : authors.length > 0 ? (
        <div className="space-y-8">
          {authors.map((author: Author, index: number) => (
            <div
              key={index}
              className="p-6 bg-white shadow-md rounded-lg border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-gray-800">{author.name}</h2>
              <div className="mt-4">
                {author.blogs && author.blogs.length > 0 ? (
                  <ul className="space-y-4">
                    {author.blogs.map((blog: Blog, index: number) => (
                      <li key={index} className="p-4 bg-gray-50 shadow rounded-md">
                        <h3 className="font-medium text-lg text-gray-700">{blog.title}</h3>
                        <p className="mt-2 text-gray-600">{blog.content.substring(0, 100)}...</p>
                        <Button className="mt-2 bg-rose-500" onClick={()=>handleDeleteBlog(blog.id)}>
                            Delete
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-gray-500">No blogs available for this author.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-xl text-gray-600">No authors found.</div>
      )}
    </div>
  );
};

export default MyComponent;
