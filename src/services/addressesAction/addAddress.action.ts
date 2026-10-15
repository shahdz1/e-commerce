"use server";

import { getMyToken } from "@/Utilities/getMyToken";
import type { AddAddressValues } from "@/schema/address.schema";

export async function addAddress(address: AddAddressValues) {
  const token = await getMyToken();
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/addresses",
    {
      method: "POST",
      headers: {
        token: token as string,
        "content-type": "application/json",
      },
      body: JSON.stringify(address),
    },
  );
  const payload = await response.json();

  if (!response.ok || payload.statusMsg === "fail") {
    throw new Error(payload.message || "Unable to add the address");
  }

  return payload;
}
