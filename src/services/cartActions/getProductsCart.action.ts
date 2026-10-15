import { getMyToken } from "@/Utilities/getMyToken";
import { CartProduct } from "@/interface/cartList.interface";

type CartData = {
  cartId?: string;
  products: CartProduct[];
};

type ApiCart = {
  _id?: string;
  cartId?: string;
  products?: CartProduct[];
  cart?: ApiCart;
};

type CartResponse = {
  status?: string;
  statusMsg?: string;
  message?: string;
  cartId?: string;
  cart?: ApiCart;
  data?: CartProduct[] | ApiCart;
};

export async function getCartData(): Promise<CartData> {
  const token = await getMyToken();
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    headers: {
      token: token as string,
    },
  });
  const payload: CartResponse = await response.json();

  if (!response.ok || payload.statusMsg === "fail" || payload.status === "error") {
    throw new Error(payload.message || "Unable to load the cart.");
  }

  const cart = payload.cart ?? (Array.isArray(payload.data) ? undefined : payload.data?.cart ?? payload.data);
  const products = Array.isArray(payload.data) ? payload.data : cart?.products ?? [];
  const cartId = payload.cartId ?? cart?.cartId ?? cart?._id;

  return {
    cartId,
    products,
  };
}

export async function getProductsCart(): Promise<CartProduct[]> {
  const cart = await getCartData();
  return cart.products;
}
