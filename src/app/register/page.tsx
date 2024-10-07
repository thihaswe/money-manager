"use client";
import { addNewUser } from "@/lib/action";
import { Box, Button, Input, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import { useFormState } from "react-dom";

const Register = () => {
  const [state, action] = useFormState(addNewUser, undefined);

  if (state?.success && state.success) {
    redirect("/login");
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
        <form action={action}>
          <Typography variant="h5">Register</Typography>
          {/* <InputLabel sx={{ fontWeight: "bold", paddingLeft: 2 }}>
            Email
          </InputLabel> */}
          <Input
            name="email"
            sx={{
              width: "100%",
              borderBottom: "1px solid black",
              padding: 2,
            }}
            type="email"
            placeholder="Email"
          ></Input>
          {/* <InputLabel sx={{ fontWeight: "bold", paddingLeft: 2 }}>
            Username
          </InputLabel> */}

          <Input
            name="username"
            sx={{
              width: "100%",
              borderBottom: "1px solid black",
              padding: 2,
            }}
            placeholder="Username"
          ></Input>
          {/* <InputLabel sx={{ fontWeight: "bold", paddingLeft: 2 }}>
            Password
          </InputLabel> */}
          <Input
            name="password"
            sx={{
              width: "100%",
              borderBottom: "1px solid black",
              padding: 2,
            }}
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
            Register
          </Button>
          {state?.success && (
            <Typography sx={{ color: "green" }}> {state.success}</Typography>
          )}
          {state?.error && (
            <Typography sx={{ color: "red" }}> {state.error}</Typography>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default Register;
