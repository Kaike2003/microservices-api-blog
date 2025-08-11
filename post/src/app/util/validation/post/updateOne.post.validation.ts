import * as z from "zod"

export const updateOnePost = z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i, "ID inválido"),
    userId: z.string().regex(/^[a-f\d]{24}$/i, "ID inválido"),
    title: z.string().min(3).max(200),
    description: z.string().min(3).max(1000)
})