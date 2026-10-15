"use server";

import { getMyToken } from "@/Utilities/getMyToken";
import type { ChangePasswordValues } from "@/schema/changePassword.schema";

export async function changePassword(values: ChangePasswordValues) {
  const token = await getMyToken();
  if (typeof token !== "string") {
    throw new Error("You must be signed in to change your password");
  }

  const response = await fetch("https://ecommerce.routemisr.com/api/v1/users/changeMyPassword", {
    method: "PUT",
    body: JSON.stringify(values),
    headers: {
      token,
      "content-type": "application/json",
    },
  });
  const payload = await response.json();

  if (!response.ok || payload.statusMsg === "fail" || payload.message === "fail") {
    throw new Error(payload.message || `Password change failed (${response.status})`);
  }

  return payload;
}
