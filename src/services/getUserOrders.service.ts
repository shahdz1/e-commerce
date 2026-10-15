
import { IUserOrder } from "@/interface/userOrder";
import { getMyToken } from "@/Utilities/getMyToken";

export async function getUserOrders(userId: string): Promise<IUserOrder[]> {
  const token = await getMyToken();
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
    {
      headers: {
        token: token as string,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  return response.json();
}