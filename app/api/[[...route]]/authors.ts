import prisma from "@/lib/db"
import { Hono } from "hono"
import bcrypt from "bcryptjs"

const app = new Hono()

app.post("/sign-up", 
    async (c) => {
        try {
            const body = await c.req.json();
            const { email, password, name } = body.data;
            const hashedPassword = await bcrypt.hash(password, 10);
        
            const author = await prisma.author.create({
              data: {
                email,
                password: hashedPassword,
                name,
              },
            });
        
            return c.json({ author }, 200);
          } catch (error) {
            console.error("Error creating author:", error);
            return c.json({ message: "Error signing up" }, 500);
          }
    }
)

export default app