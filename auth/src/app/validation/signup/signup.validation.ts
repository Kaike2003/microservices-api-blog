import * as z from "zod";

export const signup = z.object({
  email: z.email(),
  password: z.string().min(4).max(20),
});
