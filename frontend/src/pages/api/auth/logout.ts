import type { APIRoute } from "astro";

export const POST: APIRoute = async ({cookies}) => {
    cookies.delete("token", {path: "/"})

    return Response.json({ success: true})
}