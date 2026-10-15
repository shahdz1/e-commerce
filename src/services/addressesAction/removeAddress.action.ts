"use server";

import { getMyToken } from "@/Utilities/getMyToken";

export async function removeAddress(addressId: string) {
  const token = await getMyToken();
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/addresses/${encodeURIComponent(addressId)}`,
    {
      method: "DELETE",
      headers: {
        token: token as string,
      },
    },
  );
  const payload = await response.json();

  if (!response.ok || payload.statusMsg === "fail") {
    throw new Error(payload.message || "Unable to remove the address");
  }

  return payload;
}
