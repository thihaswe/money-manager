import AddCategoryButton from "@/components/buttons_and_icons/addCategoryButton";
import PcNavbar from "@/components/navbar/pcNavbar";
import { AddCircle } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* {pc Navbar} */}
      <Box>
        <PcNavbar />
      </Box>
      {/* {children } */}
      <Box
        sx={{
          height: { xs: "100%", md: "calc(100% - 80px)" }, // Default for xs, then set height for md and up
        }}
      >
        {children}
      </Box>
      {/* {pop up} */}
      <Box sx={{ xs: "none", md: "block" }}>
        <AddCategoryButton />
      </Box>
    </Box>
  );
};

export default Layout;
