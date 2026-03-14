import type { NextAuthConfig } from "next-auth";
import { isAdminRole } from "@/lib/roles";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = (auth?.user as any)?.role;
      const redirectForLoggedUser = isAdminRole(role) ? "/admin/dashboard" : "/dashboard";
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      const isOnCheckout = nextUrl.pathname.startsWith("/checkout");
      const isOnAuth = nextUrl.pathname.startsWith("/auth");

      if (isOnAdmin) {
        if (isLoggedIn) {
          if (isAdminRole(role)) return true;
          return Response.redirect(new URL("/", nextUrl));
        }
        return false;
      }

      if (isOnDashboard || isOnCheckout) {
        if (isLoggedIn) return true;
        return false;
      }

      if (isLoggedIn && isOnAuth) {
        return Response.redirect(new URL(redirectForLoggedUser, nextUrl));
      }

      return true;
    },
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    }
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;

