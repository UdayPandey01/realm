import prisma from "@/lib/db";
import { Hono } from "hono";
import bcrypt from "bcryptjs";

const app = new Hono();

app.post("/sign-in", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body.data;

    const author = await prisma.author.findUnique({
      where: {
        email,
      },
    });

    if (!author) {
      return c.json({ message: "The author is not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, author.password);

    if (!isPasswordValid) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    return c.json({ message: "Signed in successfully", author }, 200);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Sign-in error" }, 500);
  }
});

app.post("/sign-up", async (c) => {
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
});

app.get("/get-authors", async (c) => {
  const author = await prisma.author.findMany();

  return c.json({ author }, 200);
});

export default app;
