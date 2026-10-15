"use server";

import { getMyToken } from "@/Utilities/getMyToken";

export async function updateUserData(userData:any) {
  const token = await getMyToken();
  if (typeof token !== "string") {
    throw new Error("You must be signed in to change password");
  }

  const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
    method: "PUT",
    body: JSON.stringify(userData),
    headers: {
      token,
      "content-type": "application/json",
    },
  });
  const payload = await response.json();

  if (!response.ok || payload.statusMsg === "fail" || payload.message === "fail") {
    throw new Error(payload.message || `Changee failed (${response.status})`);
  }
  return payload;
}
