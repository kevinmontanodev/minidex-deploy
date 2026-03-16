import { HttpError } from "./HttpError";

export function handleApiError(err: unknown): Response {
    if (err instanceof HttpError) {
        return Response.json(
            { error: err.message },
            { status: err.status }
        );
    }

    return Response.json(
        { error: "Unexpected error" },
        { status: 500 }
    );
}