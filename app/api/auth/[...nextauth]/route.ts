import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/lib/database";
import bcrypt from "bcryptjs";

// Initialize database once
db.initializeDatabase().catch((error) => {
  console.error("Failed to initialize database:", error);
});

// Cache for session user data
const userCache = new Map();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }
        try {
          const user = await db.findUserByEmail(credentials.email);
          if (!user || !user.password) {
            throw new Error("Invalid credentials");
          }
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) {
            throw new Error("Invalid credentials");
          }
          return { id: user.id, name: user.name, email: user.email, image: user.image };
        } catch (error) {
          console.error("Authorize error:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === "google") {
          if (!user.email) {
            return "/login/error?error=NoEmail";
          }
          let existingUser = await db.findUserByEmail(user.email);
          if (!existingUser) {
            existingUser = await db.createUser({
              name: user.name || "Google User",
              email: user.email,
              image: user.image || profile?.picture,
              provider: "google",
            });
            if (!existingUser) {
              return "/login/error?error=UserCreationFailed";
            }
          }
          user.id = existingUser.id;
          user.phoneNumber = existingUser.phoneNumber;
          user.location = existingUser.location;
          user.provider = existingUser.provider;
          // Cache user data
          userCache.set(user.id, {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            phoneNumber: user.phoneNumber,
            location: user.location,
            provider: user.provider,
            cachedAt: Date.now(),
          });
        }
        return true;
      } catch (error) {
        console.error("SignIn callback error:", error);
        return `/login/error?error=${encodeURIComponent(error.message || "SignInFailed")}`;
      }
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.phoneNumber = user.phoneNumber;
        token.location = user.location;
        token.provider = user.provider || account?.provider;
      }
      return token;
    },
    async session({ session, token }) {
      try {
        if (token.id) {
          // Check cache first (valid for 5 minutes)
          const cachedUser = userCache.get(token.id);
          if (cachedUser && Date.now() - cachedUser.cachedAt < 5 * 60 * 1000) {
            session.user = cachedUser;
            return session;
          }
          // Fetch from database
          const user = await db.findUserById(token.id);
          if (user) {
            session.user = {
              id: user.id,
              name: user.name,
              email: user.email,
              image: user.image,
              phoneNumber: user.phoneNumber,
              location: user.location,
              provider: user.provider,
            };
            // Update cache
            userCache.set(token.id, {
              ...session.user,
              cachedAt: Date.now(),
            });
          } else {
            session.user.id = token.id;
            session.user.phoneNumber = token.phoneNumber;
            session.user.location = token.location;
            session.user.provider = token.provider;
          }
        }
        return session;
      } catch (error) {
        console.error("Session callback error:", error);
        return session; // Fallback to token data
      }
    },
  },
  pages: {
    signIn: "/login/signin",
    error: "/login/error",
    signOut: "/login/signout",
  },
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  jwt: { maxAge: 30 * 24 * 60 * 60 },
  secret: process.env.NEXTAUTH_SECRET,
  debug: false,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };