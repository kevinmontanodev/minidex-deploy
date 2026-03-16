import { HttpError } from "../errors/HttpError";


const BASE_URL = import.meta.env.BACKEND_BASE_URL || 'http://api:8080/api/v1';

export async function backendFetch<T = any>(
    path: string,
    options: RequestInit = {}
) : Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        }
    });

    if (!res.ok) {
        if (res.status >= 500) {
            throw new HttpError(
                500,
                "Ocurrió un error inesperado. Intenta más tarde."
            );
        }
        const errorBody = await safeReadError(res);
        throw new HttpError(res.status, errorBody);
    }

        // 204 No Content
    if (res.status === 204) {
        return null as T;
    }

    const text = await res.text();
    if (!text){
        return null as T
    }

    return JSON.parse(text) as T;
}


async function safeReadError(res: Response): Promise<string> {
    try {
        const contentType = res.headers.get("content-type");
        if (contentType?.includes("application/json")) {
            const json = await res.json();
            return json.message ?? JSON.stringify(json);
        }
        return await res.text();
    } catch {
        return "Error desconocido";
    }
}
