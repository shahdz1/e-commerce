import * as zod from "zod";

export const checkOutSchema = zod.object({
  city: zod.string().nonempty("city is requird"),
  details: zod.string().nonempty("details is requird"),
  phone: zod
    .string()
    .nonempty("phone is requird")
    .regex(/^01[0125][0-9]{8}$/, "must be egyptian number"),
});
