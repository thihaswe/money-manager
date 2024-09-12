import PhoneNavbar from "@/components/navbar/phoneNavbar";
import { Box } from "@mui/material";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    // main layout
    <Box
      sx={{
        height: { xs: "100vh", md: "auto" },
        overflow: "hidden",
      }}
    >
      {/* children part (record ,report , chart) */}
      <Box
        sx={{
          height: {
            xs: "calc(100vh - 80px)",
            md: "100vh",
          },
          // overflow: "auto",
        }}
      >
        {children}
      </Box>
      {/* phone navbar   */}
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          margin: 0,
          padding: 0,
        }}
      >
        <PhoneNavbar />
      </Box>
    </Box>
  );
};

export default Layout;
