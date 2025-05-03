import { redirect } from "next/navigation"

export default function Home() {
  redirect("/user/authentifiaction/sign_up") // Redirect to the sign-in page
  // redirect("/autthentication") // Uncomment this line to redirect to the authentication page 
  return null
}
