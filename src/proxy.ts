import { NextRequest, NextResponse } from "next/server";
import { getMyToken } from "./Utilities/getMyToken";

export async function proxy(request: NextRequest) {
  const token = await getMyToken();
  if (token) {
    if (
      request.nextUrl.pathname == "/login" ||
      request.nextUrl.pathname == "/signup"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      return NextResponse.next();
    }
  }
}
export const config = {
  matcher: ["/login", "/signup"],
};
