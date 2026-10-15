import * as zod from "zod";

export const signupSchema = zod
  .object({
    name: zod.string().nonempty("name is required").min(2, "at least 2 character").max(20, "at most 20 character"),
    email: zod.email("invalid email").nonempty("email is requird"),
    phone: zod.string().nonempty("phone is requird").regex(/^01[0125][0-9]{8}$/, "must be egyptian number"),
    password: zod
      .string()
      .nonempty("enter a password")
      .regex(/^.{3,}$/),
    rePassword: zod.string().nonempty("confirm password"),
  })
  .refine(
    (obj) => {
      return obj.password == obj.rePassword;
    },
    {
      error: "not matched",
      path: ["rePassword"],
    },
  );

export const profileSchema = zod.object({
  name: zod.union([
    zod.literal(""),
    zod.string().min(2, "at least 2 character").max(20, "at most 20 character"),
  ]),
  email: zod.union([zod.literal(""), zod.email("invalid email")]),
  phone: zod.union([
    zod.literal(""),
    zod.string().regex(/^01[0125][0-9]{8}$/, "must be egyptian number"),
  ]),
});

export type ProfileValues = zod.infer<typeof profileSchema>;
