import prisma from "@/lib/db"
import {Hono} from "hono"

const app = new Hono()
    .post("/", 
        async(c) => {
            const body = await c.req.json()
            console.log(body)

            const {title, content, likes = 0, published = false, authorId, category} = body.data
            const blog = await prisma.blog.create({
                data : {
                    title,
                    content,
                    likes,
                    published, 
                    authorId,
                    category
                }
            })

            return c.json({blog}, 200)
        }
    )

    .get("/get-blog/:id",
        async (c) => {
            const {BlogId} = c.req.param("id")
            try{
                const blog = await prisma.blog.findMany({
                    where: {
                        id : BlogId
                    }
                })

                if (!blog) {
                    return c.json({ error: "Blog not found" }, 404);
                }
    
                return c.json({blog}, 200)
            }catch(error) {
                console.error(error)
                return c.json({
                    error : "failed to fetch crop"
                },500)
            }
        }
    )

export default app
