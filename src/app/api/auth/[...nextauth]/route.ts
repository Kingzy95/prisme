import NextAuth, { AuthOptions, Session, User } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { db } from "@/lib/db"
import { compare } from "bcrypt"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email et mot de passe requis")
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.password) {
          throw new Error("Email incorrect")
        }

        const isValid = await compare(credentials.password, user.password)

        if (!isValid) {
          throw new Error("Mot de passe incorrect")
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user }: { session: Session; user: User }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          role: (user as any).role, // TypeScript ne reconnaît pas `role` dans User, alors on force le typage
        },
      }
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt" as const, // Correction du type
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
