"use client";
import { store } from "@/store/store";
import { Box } from "@mui/material";
import { ReactNode } from "react";
import { Provider } from "react-redux";

const WrapperLayout = ({ children }: { children: ReactNode }) => {
  // for wrapping the client components

  return <Provider store={store}>{children}</Provider>;
};

export default WrapperLayout;
