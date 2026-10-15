import { getMyToken } from "@/Utilities/getMyToken";
import type { IAddressResponse } from "@/interface/address.interface";

export async function getAddress(): Promise<IAddressResponse> {
  const token = await getMyToken();
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/addresses",
    {
      headers: {
        token: token as string,
      },
    },
  );

  const payload: IAddressResponse = await response.json();

  if (!response.ok || payload.statusMsg === "fail") {
    throw new Error(payload.message || "Unable to get addresses");
  }

  return payload;
}
