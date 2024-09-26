"use client";

import {
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ExpenseIncome from "./expenseIncome";

interface Prop {
  pathname: string;
  replace: (para: string) => void;
  open: boolean;
  setOpen: (para: boolean) => void;
}
const PcPopUp = ({ prop }: { prop: Prop }) => {
  const { replace, pathname, setOpen, open } = prop;
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const [alignment, setAlignment] = useState("expense");
  const [input, setInput] = useState<boolean>(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const cat = [
    { id: 1, name: "a" },
    { id: 2, name: "b" },
    { id: 3, name: "c" },
    { id: 4, name: "d" },
  ];

  useEffect(() => {
    if (!matches) {
      setOpen(false);
      setInput(false);
    }

    if (matches && type) {
      setOpen(true);
    }

    setAlignment(type);
  }, [type, matches]);

  //expense logic
  // const expenseCategories: Category[] = [].filter(
  //   (cat: Category) => cat.title === TitleName.expense
  // );

  // style for button
  const toggleButtonStyles = {
    color: "white",
    "&.Mui-selected": {
      color: "black",
      backgroundColor: "white",
      "&:hover": {
        color: "black",
        backgroundColor: "white",
      },
    },
    "&:hover": {
      backgroundColor: "grey",
      color: "black", // Text color on hover
    },
  };

  // functions
  const handleChange = (event: any) => {
    setAlignment(event.target.value);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("type", event.target.value);
    replace(`${pathname}?${newParams.toString()}`);
    setInput(false);
  };

  const handleCancel = () => {
    replace(`${pathname}`);
    setAlignment("expense");
    setOpen(false);
    setInput(false);
  };
  return (
    <Box
      sx={{
        display: { xs: "none", md: "block" },
        height: "100vh",
        width: "100vw",
        bgcolor: "black",
        position: "absolute",
        color: "white",
        top: open ? 0 : "calc(100vh)",
        transition: "top 0.5s ease-in-out ",
      }}
    >
      <Button onClick={handleCancel}>
        <Typography>cancel</Typography>
      </Button>

      {/* {toogle} */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <ToggleButtonGroup
          sx={{ border: "1px solid grey" }}
          value={alignment}
          exclusive
          onChange={(e) => {
            handleChange(e);
          }}
        >
          <ToggleButton value="expense" sx={toggleButtonStyles}>
            Expense
          </ToggleButton>
          <ToggleButton value="income" sx={toggleButtonStyles}>
            Income
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          transition: "all 0.8s ease-in-out",
          width: "200vw",
          transform: alignment === "income" ? "translateX(-100vw)" : 0,
        }}
      >
        {/* {expense box} */}
        <ExpenseIncome prop={{ category: cat, setInput, input, setOpen }} />
        {/* {income box} */}
        <ExpenseIncome prop={{ category: cat, setInput, input, setOpen }} />
      </Box>
    </Box>
  );
};

export default PcPopUp;
