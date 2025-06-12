import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  return session?.user
}

export async function requireAuth() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/login/signin")
  }

  return session.user
}

export async function requireNoAuth() {
  const session = await getServerSession(authOptions)

  if (session?.user) {
    redirect("/user")
  }
}
