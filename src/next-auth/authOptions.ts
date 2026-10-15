import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "login",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: {
              "content-type": "application/json",
            },
          },
        );

        const data = await response.json();

        if (!response.ok || !data.token || !data.user) {
          return null;
        }

        const decoded = jwtDecode<{ id: string }>(data.token);

        return {
          id: decoded.id,
          email: data.user.email,
          name: data.user.name,
          phone: data.user.phone,
          token: data.token,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ user, token, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.token = user.token;
        token.phone = user.phone;
      }
      if (trigger === "update" && session) {
        const updatedUser = session.user ?? session;
        if (typeof updatedUser.name === "string") token.name = updatedUser.name;
        if (typeof updatedUser.email === "string") token.email = updatedUser.email;
        if (typeof updatedUser.phone === "string") token.phone = updatedUser.phone;
      }
      return token;
    },
    session({ token, session }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.phone = token.phone ?? "";
      }
      return session;
    },
  },
};
