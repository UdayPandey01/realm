import prisma from "@/lib/db"
import {Hono} from "hono"
import jwt, { JwtPayload } from "jsonwebtoken"

const app = new Hono()

app.post("create-comment/:id",
    async(c) => {
        const blogId = c.req.param("id")

        const authHeader = c.req.header("Authorization")
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return c.json({ message: "No token provided" }, 401);
        }

        const token = authHeader.split(" ")[1]
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET || "sbhsygaiasiubjh") as JwtPayload & { authorId: string }
            const authorId = decode.userId

            const { content } = await c.req.json();

            console.log(content)

            const newComment = await prisma.comment.create({
                data : {
                    content,
                    blogId,
                    authorId
                }
            })

            return c.json({ comment: newComment }, 201);

        } catch (error) {
            console.error("Error creating comment", error)
            return c.json({message : "failed to fetch comment"}, 500)
        }
    }
)

app.get("comments/:id",
    async(c) => {
        const blogId = c.req.param("id")
        try {
            const comments = await prisma.comment.findMany({
              where: { blogId },
              include: {
                 author: {
                    select : {
                        name : true
                    }
                 }
                },
              orderBy: { createdAt: "desc" },
            });
        
            return c.json({ comments }, 200);
          } catch (error) {
            console.error("Error fetching comments:", error);
            return c.json({ message: "Failed to fetch comments" }, 500);
          }
    }
)

export default app