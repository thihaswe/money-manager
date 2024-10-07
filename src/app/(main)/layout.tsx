"use client";

import AddCategoryButton from "@/components/buttons_and_icons/addCategoryButton";
import PcNavbar from "@/components/navbar/pcNavbar";
import PhoneNavbar from "@/components/navbar/phoneNavbar";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchCategoryThunk } from "@/store/slices/categorySlice";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, Suspense, useEffect } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.id && status === "authenticated") {
      dispatch(fetchCategoryThunk(session.user.id));
    }
  }, [session?.user?.id]);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <PcNavbar />
      </Box>
      {/* children part (record, report, chart) */}
      <Box
        sx={{
          height: "calc(100vh - 60px)", // Adjusting for the phone navbar height
          width: "100%",
        }}
      >
        {children}
      </Box>

      {/* phone navbar */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0, // Position it at the bottom
          left: 0,
          right: 0,
          height: "60px", // Set the height of the navbar
          width: "100%",
          margin: 0,
          padding: 0,
          display: { xs: "block", md: "none" },
        }}
      >
        <Suspense>
          <PhoneNavbar />
        </Suspense>
      </Box>

      {/* {pc add note} */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: { xs: "none", md: "block" }, // Show only on medium screens and larger
        }}
      >
        <Suspense>
          <AddCategoryButton />
        </Suspense>
      </Box>
    </Box>
  );
};

export default Layout;
