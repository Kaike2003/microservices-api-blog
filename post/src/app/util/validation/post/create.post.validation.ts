import * as z from "zod"


export const createPost = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(3).max(500),
    userId: z.string().regex(/^[a-f\d]{24}$/i, "ID inválido")
})