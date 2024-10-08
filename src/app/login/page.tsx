"use client";

import { handleGoogleSignIn, logInCredentials } from "@/lib/action";
import { useAppDispatch } from "@/store/hook";
import { setUser } from "@/store/slices/userSlice";

import { Box, Button, Input, Typography } from "@mui/material";

import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

import { useFormState } from "react-dom";

export default function LogInPage() {
  const [state, action] = useFormState(logInCredentials, undefined);
  const dispatch = useAppDispatch();
  const router = useRouter();
  if (state?.success && state.success) {
    dispatch(setUser(state.user));
    redirect("/record");
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: { xs: "50%", sm: "40%", md: "30%", lg: "20%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 15,
          paddingBottom: 20,
          bgcolor: "#CCD6EB",
          borderRadius: "3%",
        }}
      >
        <Typography variant="h5">Log In</Typography>
        <form action={action}>
          <Input
            sx={{
              width: "100%",
              borderBottom: "1px solid black",
              padding: 2,
            }}
            name="email"
            placeholder="Email"
          ></Input>
          <Input
            sx={{
              width: "100%",
              borderBottom: "1px solid black",
              padding: 2,
            }}
            name="password"
            type="password"
            placeholder="Password"
          ></Input>
          <Button
            type="submit"
            sx={{
              width: "100%",
              bgcolor: "green",
              color: "white",
              padding: 2,
              marginTop: 3,
              "&:hover": {
                bgcolor: "#006400",
              },
            }}
          >
            Log In
          </Button>
        </form>

        {/* Client-side Google sign-in */}
        <form action={handleGoogleSignIn}>
          <Button
            type="submit"
            style={{ width: "100%", padding: 0, marginTop: 2 }}
          >
            Sign in with Google
          </Button>
        </form>

        {state?.success && (
          <Typography sx={{ color: "green" }}> {state.success}</Typography>
        )}
        {state?.error && (
          <Typography sx={{ color: "red" }}> {state.error}</Typography>
        )}
        <Link href={"/register"} style={{ marginTop: 15 }}>
          <Typography>don't have an account? register?</Typography>
        </Link>
      </Box>
    </Box>
  );
}
