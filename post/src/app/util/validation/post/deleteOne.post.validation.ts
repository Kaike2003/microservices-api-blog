import * as z from "zod"

export const deleteOnePost = z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i, "ID inválido")
})