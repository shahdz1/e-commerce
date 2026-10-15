"use server";

import { getMyToken } from "@/Utilities/getMyToken";
import type { ProfileValues } from "@/schema/signup.schema";

export async function updateUserData(userData: Partial<ProfileValues>) {
  const token = await getMyToken();
  if (typeof token !== "string") {
    throw new Error("You must be signed in to update account details");
  }

  const response = await fetch("https://ecommerce.routemisr.com/api/v1/users/updateMe/", {
    method: "PUT",
    body: JSON.stringify(userData),
    headers: {
      token,
      "content-type": "application/json",
    },
  });
  const payload = await response.json();

  if (!response.ok || payload.statusMsg === "fail" || payload.message === "fail") {
    throw new Error(payload.message || `Update failed (${response.status})`);
  }
  return payload;
}
