import type { MiddlewareHandler } from "astro";
import { HttpError } from "./server/errors/HttpError";


export const onRequest: MiddlewareHandler = async (context, next) => {
    const token = context.cookies.get("token")?.value
    const pathname = context.url.pathname

    // public routes
    if (pathname.startsWith("/login") || pathname.startsWith("/api/auth/login") || pathname.startsWith("/api/auth/register") ){
        return next()
    }

    // if token does not exist, redirect to the login page
    if (!token){
        return Response.redirect(new URL("/login", context.url), 302)
    }

    // save token in locals
    context.locals.token = token;

    try {
        return await next()
    } catch (err: any) {
        // if the token has already expired, redirect to the login page
        if (err instanceof HttpError && (err.status === 401 || err.status === 403)){
            context.cookies.delete("token")
            return Response.redirect(new URL("/login", context.url), 302)
        }

        throw err;
    }
}