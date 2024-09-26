import { signIn } from "@/lib/auth";
import { Box, Button, Input, Typography } from "@mui/material";
import Image from "next/image";

import React from "react";

const LogInPage = () => {
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
        <Input
          sx={{
            width: "100%",
            borderBottom: "1px solid black",
            padding: 2,
          }}
          placeholder="Username"
        ></Input>
        <Input
          sx={{
            width: "100%",
            borderBottom: "1px solid black",
            padding: 2,
          }}
          placeholder="Password"
        ></Input>
        <Button
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
        <form
          style={{ width: "100%", marginTop: 15 }}
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <Button type="submit" sx={{ width: "100%", padding: 0 }}>
            <Box sx={{ position: "relative", width: "100%", height: 70 }}>
              <Image src="/google.jpg" alt="google photo" fill={true} />
            </Box>
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default LogInPage;
