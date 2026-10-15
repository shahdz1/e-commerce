import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      address?: string;
      phone: string;
    } & DefaultSession["user"];
  }
  interface User {
    token: string;
    phone?: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    token: string;
    phone?: string;
  }
}
