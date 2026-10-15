import { getMyToken } from "@/Utilities/getMyToken";
type checkout = {
  city: string;
  phone: string;
  details: string;
};
export async function cashOnOrder(cartId: string, formData: checkout) {
  const token = await getMyToken();
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
    {
      method: "POST",
      headers: {
        token: token as string,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        shippingAddress: formData,
      }),
    },
  );
  const payload = await response.json();

  return payload;
}
