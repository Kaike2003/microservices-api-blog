import * as z from "zod"

export const getAllPost = z.object({
    userId: z.string().regex(/^[a-f\d]{24}$/i, "ID inválido")
})