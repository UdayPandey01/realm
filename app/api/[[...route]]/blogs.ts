import prisma from "@/lib/db";
import { log } from "console";
import { Hono } from "hono";
import jwt, { JwtPayload } from "jsonwebtoken";

const app = new Hono()
  .post("/publish-blog", async (c) => {
    const authHeader = c.req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ message: "No token provided" }, 401);
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "sbhsygaiasiubjh"
      ) as JwtPayload & { authorId: string };

      const authorId = decoded.userId;

      const body = await c.req.json();

      const {
        title,
        content,
        likes = 0,
        published = false,
        category,
      } = body.data;

      const Category = category.toLowerCase()
      const blog = await prisma.blog.create({
        data: {
          title,
          content,
          likes,
          published,
          authorId,
          category : Category,
        },
      });

      return c.json({ blog }, 200);
    } catch (error) {
      console.error(error);
      return c.json({ message: "Invalid or expired token" }, 401);
    }
  })
  .get("/get-blog",
    async(c) => {
        try{
            const blog = await prisma.blog.findMany()

            if(!blog){
                return c.json({message : "Can not find blog"}, 500)
            }

            return c.json({blog}, 200)
        }catch(error){
            console.error(error)
            return c.json({message : "No blog"})
        }
    }
  )

  .get("/get-blog/:id", async (c) => {
    const  BlogId  = c.req.param("id");
    try {
      const blog = await prisma.blog.findUnique({
        where: {
          id: BlogId,
        },
      });

      if (!blog) {
        return c.json({ error: "Blog not found" }, 404);
      }

      return c.json({ blog }, 200);
    } catch (error) {
      console.error(error);
      return c.json(
        {
          error: "failed to fetch blog",
        },
        500
      );
    }
  })

  .get("/cat-blog/:cat", async (c) => {
    const  category  = c.req.param("cat");
    try {
      const blog = await prisma.blog.findMany({
        where: {
          category : category
        },
      });

      if (!blog) {
        return c.json({ error: "Blog not found" }, 404);
      }

      return c.json({ blog }, 200);
    } catch (error) {
      console.error(error);
      return c.json(
        {
          error: "failed to fetch blog",
        },
        500
      );
    }
  })

  .get("/three-blogs", 
    async(c) => {
      try {
        const blogs = await prisma.blog.findMany({
          take: 3,
          include: {
            author: true,
          },
        });
        
        return c.json({ blogs });
      } catch (error) {
        console.error("Error fetching blogs:", error);
        return c.json({ message: "Error fetching blogs" }, 500);
      }
    }
  )

  .get("/paginated-blogs", async (c) => {
    const page = parseInt(c.req.query("page") || "1", 10);
    const limit = parseInt(c.req.query("limit") || "3", 10);
    const skip = (page - 1) * limit;
  
    const blogs = await prisma.blog.findMany({
      skip,
      take: limit,
      include: { author: true },
    });
  
    const totalBlogs = await prisma.blog.count();
    const totalPages = Math.ceil(totalBlogs / limit);
  
    return c.json({
      blogs,
      currentPage: page,
      totalPages,
    });
  })
  .delete('/del-author-blog/:id', async (c) => {
    try {
      const {id} = await c.req.param()
      if (!id) {
        return c.json({ error: 'Blog ID is required' }, 400); 
      }

      const blogExists = await prisma.blog.findUnique({
        where: { id },
      });

      if (!blogExists) {
        console.error('Blog not found with ID:', id);
        return c.json({ error: `Blog with ID ${id} not found` }, 404);
      }

      await prisma.comment.deleteMany({
        where: { blogId: id },
      });

      const deletedBlog = await prisma.blog.delete({
        where: { id },
      });
      return c.json({ DeletedBlog: deletedBlog });
    } catch (error: any) {
      console.error('Error deleting blog:', error.stack); 
    }
  });
export default app;
