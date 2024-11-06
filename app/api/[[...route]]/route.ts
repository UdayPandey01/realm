import {Hono} from "hono"
import { handle } from "hono/vercel"
import blogs from "./blogs"
import authors from "./authors"
import comments from "./comments"

const app = new Hono().basePath('/api')

app
    .route("/blogs", blogs)
    .route("/authors", authors)
    .route("/comments", comments)

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)
