import * as z from "zod"

export const updatePassword = z.object({
    email: z.email(),
    newPassword: z.string().min(4).max(20),
    oldPassword: z.string().min(4).max(20),
})