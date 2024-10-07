"use client";

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
        <Suspense>
          <PhoneNavbar />
        </Suspense>
      </Box>
    </Box>
  );
};

export default Layout;
