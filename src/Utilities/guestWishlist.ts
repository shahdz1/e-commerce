import { IProduct } from "@/interface/product.interface";

const guestWishlistKey = "fresh-cart-guest-wishlist";

export function getGuestWishlist(): IProduct[] {
  const wishlist = localStorage.getItem(guestWishlistKey);
  return wishlist ? JSON.parse(wishlist) as IProduct[] : [];
}

function saveGuestWishlist(wishlist: IProduct[]) {
  localStorage.setItem(guestWishlistKey, JSON.stringify(wishlist));
}

export function addGuestWishlistProduct(product: IProduct) {
  const wishlist = getGuestWishlist();
  if (!wishlist.some((item) => item._id === product._id)) {
    wishlist.push(product);
    saveGuestWishlist(wishlist);
  }
  return wishlist;
}

export function removeGuestWishlistProduct(productId: string) {
  const wishlist = getGuestWishlist().filter((product) => product._id !== productId);
  saveGuestWishlist(wishlist);
  return wishlist;
}
