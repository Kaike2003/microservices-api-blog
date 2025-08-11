import * as z from "zod"

export const getOnePost = z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i, "ID inválido"),
    userId: z.string().regex(/^[a-f\d]{24}$/i, "ID inválido")
})