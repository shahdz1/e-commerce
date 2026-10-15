import * as zod from "zod";
import { checkOutSchema } from "@/schema/checkout.schema";

export const addAddressSchema = checkOutSchema.extend({
  name: zod
    .string()
    .nonempty("name is required")
    .min(2, "at least 2 characters"),
});

export type AddAddressValues = zod.infer<typeof addAddressSchema>;
