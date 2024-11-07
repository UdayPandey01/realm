import CreateBlog from "@/components/CreateBlog";
import Navbar from "@/components/Navbar";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-5xl">
        <CreateBlog />
      </div>
    </div>
  );
};

export default page;
