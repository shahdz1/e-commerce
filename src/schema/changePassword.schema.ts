import * as zod from "zod";

export const changePasswordSchema = zod
  .object({
    currentPassword: zod.string().nonempty("enter your current password"),
    password: zod.string().min(3, "password must be at least 3 characters"),
    rePassword: zod.string().nonempty("confirm your new password"),
  })
  .refine((values) => values.password === values.rePassword, {
    message: "passwords do not match",
    path: ["rePassword"],
  });

export type ChangePasswordValues = zod.infer<typeof changePasswordSchema>;
