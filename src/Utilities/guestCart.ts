import { CartProduct } from "@/interface/cartList.interface";
import { IProduct } from "@/interface/product.interface";

const guestCartKey = "fresh-cart-guest";

export function getGuestCart(): CartProduct[] {
  const cart = localStorage.getItem(guestCartKey);
  return cart ? JSON.parse(cart) as CartProduct[] : [];
}

function saveGuestCart(cart: CartProduct[]) {
  localStorage.setItem(guestCartKey, JSON.stringify(cart));
}

export function addGuestProduct(product: IProduct, price = product.price) {
  const cart = getGuestCart();
  const existingProduct = cart.find((item) => item.product._id === product._id);

  if (existingProduct) {
    existingProduct.count = Math.min(existingProduct.count + 1, product.quantity);
  } else {
    cart.push({
      _id: product._id,
      count: 1,
      price,
      product,
    });
  }

  saveGuestCart(cart);
  return cart;
}

export function updateGuestProduct(productId: string, count: number) {
  const cart = getGuestCart().map((item) =>
    item.product._id === productId ? { ...item, count } : item
  );
  saveGuestCart(cart);
  return cart;
}

export function removeGuestProduct(productId: string) {
  const cart = getGuestCart().filter((item) => item.product._id !== productId);
  saveGuestCart(cart);
  return cart;
}

export function clearGuestCart() {
  saveGuestCart([]);
}
