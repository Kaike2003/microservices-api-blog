import * as z from "zod"

export const updateEmail = z.object({
    newEmail: z.email(),
    oldEmail: z.email()
})