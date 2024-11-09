import prisma from "@/lib/db";
import { Hono } from "hono";
import jwt, { JwtPayload } from "jsonwebtoken";

const app = new Hono()
  .post("/publish-blog", async (c) => {

    console.log("first")
    const authHeader = c.req.header("Authorization");

    console.log("authHeader",authHeader)
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ message: "No token provided" }, 401);
    }

    const token = authHeader.split(" ")[1];
    console.log(token)

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "sbhsygaiasiubjh"
      ) as JwtPayload & { authorId: string };

      const authorId = decoded.userId;
      console.log(authorId)

      const body = await c.req.json();
      console.log(body);

      const {
        title,
        content,
        likes = 0,
        published = false,
        category,
      } = body.data;

      const blog = await prisma.blog.create({
        data: {
          title,
          content,
          likes,
          published,
          authorId,
          category,
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

  

export default app;
