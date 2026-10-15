'use server'
import { ILogin } from "@/interface/login.interface";
import { cookies } from "next/headers";

export async function LoginForm(payload: ILogin) {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/signin",
    {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "content-type": "application/json",
      },
    },
  );

  const data = await response.json();

  if (!response.ok || !data.token) {
    return false;
  }

  const cookie = await cookies();
  cookie.set("userToken", data.token, {
    httpOnly: true,
  });
  return response.ok;
}
