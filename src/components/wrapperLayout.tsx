"use client";
import { store } from "@/store/store";
import { ThemeProvider } from "@mui/material";
import { ReactNode } from "react";
import { Provider } from "react-redux";

const WrapperLayout = ({ children }: { children: ReactNode }) => {
  // for wrapping the client components

  return (
    <div>
      <Provider store={store}>{children}</Provider>
    </div>
  );
};

export default WrapperLayout;
