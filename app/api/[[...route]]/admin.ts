import isAdminMiddleware from "@/middleware"
import { Hono } from "hono"
const app = new Hono()
app.get('/admin',  
    async(c) => {
      return c.json({message : "Hello admin"})
    }
  )

export default app  