import { Box } from "@mui/material";
import { auth, signIn, signOut } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth(); // Fetching the session
  const headerList = headers();
  const pathname = headerList.get("x-current-path");

  return (
    <Box>
      <div>{pathname}</div>
      <Box>{session?.user?.email}</Box>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
      <form
        action={async () => {
          "use server";
          await signIn("google"); // Trigger sign-in when user is not authenticated
        }}
      >
        <button type="submit">Sign in</button>
      </form>
      <form
        action={async () => {
          "use server";
          await signIn("credentials", {
            email: "test@gmail.com",
          }); // Trigger sign-in when user is not authenticated
        }}
      >
        <button type="submit">credentials Sign in</button>
      </form>
    </Box>
  );
}
