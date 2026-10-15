import * as zod from "zod";

export const loginSchema = zod.object({
  email: zod.email("invalid email").nonempty("email is requird"),
  password: zod
    .string()
    .nonempty("enter a password")
    .regex(/^.{3,}$/),
});
