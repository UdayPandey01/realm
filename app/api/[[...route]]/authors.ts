import prisma from "@/lib/db";
import { Hono } from "hono";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"  
// import isAdminMiddleware from "@/middleware"

const app = new Hono();

// app.get('/admin', isAdminMiddleware, 
//   async(c) => {
//     return c.json({message : "Hello admin"})
//   }
// )

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
      return c.json({ message: "The author is not found" }, 404);
    }

    const isPasswordValid = await bcrypt.compare(password, author.password);

    if (!isPasswordValid) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    const token = jwt.sign({userId : author.id, role: author.role}, process.env.JWT_SECRET || "sbhsygaiasiubjh")

    return c.json({ message: "Signed in successfully", author, token }, 200);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Sign-in error" }, 500);
  }
});


app.post("/sign-up", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name, role } = body.data;

    const existingAuthor = await prisma.author.findUnique({
      where: {
        email,
      },
    });

    if (existingAuthor) {
      return c.json({ error: "Email is already taken" }, 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const author = await prisma.author.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role
      },
    });
    
    const token = jwt.sign({userId : author.id, role: author.role}, process.env.JWT_SECRET || "sbhsygaiasiubjh")

    return c.json({
      message : "Signed up successfully",
      token,
      author,
      authorId : author.id 
    }, 200);

  } catch (error) {
    console.error("Error creating author:", error);
    return c.json({ message: "Error signing up" }, 500);
  }
});

app.get('/get-signInUser-detail', 
  async(c) => {
    const authHeader = c.req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ message: "No token provided" }, 401);
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(
        token,
        "ssushddjiojqoj154"
      ) as { role: string };

      const role = decoded.role;
      return c.json({role})

  }catch(error)  {
    console.log(error)
  }
})

app.get("/get-authors", async (c) => {
  const author = await prisma.author.findMany({
    include : {
      blogs : true
    }
  });

  return c.json({ author }, 200);
});



export default app;
