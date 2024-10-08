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
      {/* {pc navbar} */}
      <PcNavbar />

      {/* children part (record, report, chart) */}
      <Box
        sx={{
          height: "calc(100vh - 60px)",
          width: "100%",
        }}
      >
        {children}
      </Box>

      {/* phone navbar and pc add notes */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0, // Position it at the bottom
          left: 0,
          right: 0,
        }}
      >
        <Suspense>
          <AddCategoryButton />
        </Suspense>
        <Suspense>
          <PhoneNavbar />
        </Suspense>
      </Box>
    </Box>
  );
};

export default Layout;
