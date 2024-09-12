"use client";
import {
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ExpenseIncome from "./expenseIncome";
import { useSearchParams } from "next/navigation";

interface Prop {
  pathname: string;
  replace: (para: string) => void;
  open: boolean;
  setOpen: (para: boolean) => void;
}

const PopUp = ({ prop }: { prop: Prop }) => {
  const { replace, pathname, setOpen, open } = prop;
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const [alignment, setAlignment] = useState("expense");
  const [input, setInput] = useState<boolean>(false);

  const cat = [{ name: "a" }, { name: "b" }, { name: "c" }, { name: "d" }];
  //expense logic
  // const expenseCategories: Category[] = [].filter(
  //   (cat: Category) => cat.title === TitleName.expense
  // );

  useEffect(() => {
    setAlignment(type);
  }, [type]);

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
    // replace(`${pathname}`);
    setOpen(false);
    setInput(false);
    setAlignment("expense");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        bgcolor: "black",
        position: "absolute",
        color: "white",
        top: open ? "calc(-100vh + 80px)" : 100,
        // top: {
        //   md: open ? "calc(-100vh + 80px)" : 100, // For medium screens (md)
        //   lg: open ? 0 : "calc(100vh)", // For large screens (lg)
        // },
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
          height: "100%",
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

export default PopUp;
