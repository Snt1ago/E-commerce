import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      const isOnCheckout = nextUrl.pathname.startsWith("/checkout");

      if (isOnAdmin) {
        if (isLoggedIn) {
          // Check if user is admin
          const role = (auth?.user as any)?.role;
          if (role === "admin") return true;
          return Response.redirect(new URL("/", nextUrl)); // Redirect non-admins to home
        }
        return false; // Redirect unauthenticated users to login page (default behavior of returning false)
      }

      if (isOnDashboard || isOnCheckout) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // Redirect logged-in users away from auth pages
        // if (nextUrl.pathname.startsWith('/auth')) {
        //   return Response.redirect(new URL('/dashboard', nextUrl));
        // }
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
