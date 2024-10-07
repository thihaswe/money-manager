"use client";
import {
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const ExpenseIncome = dynamic(() => import("./expenseIncome"), { ssr: false });

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
  const theme = useTheme();

  useEffect(() => {
    if (type) {
      setOpen(true);
    }

    setAlignment(type);
  }, [type]);

  // style for button
  const toggleButtonStyles = {
    fontSize: 10,

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
        // display: { xs: "block", md: "none" },
        height: "100vh",
        width: "100vw",
        bgcolor: "black",
        position: "absolute",
        color: "white",
        top: open ? "calc(-100vh + 60px)" : 100,

        transition: "top 0.5s ease-in-out ",
      }}
    >
      <Button onClick={handleCancel}>
        <Typography>cancel</Typography>
      </Button>

      {/* {toogle} */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <ToggleButtonGroup
          sx={{ border: "1px solid grey", mb: 5 }}
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
        <Suspense fallback={<div>loading</div>}>
          {/* {expense box} */}
          <ExpenseIncome prop={{ setInput, input, setOpen, alignment }} />
        </Suspense>
        {/* {income box} */}
        <Suspense fallback={<div>loading</div>}>
          <ExpenseIncome prop={{ setInput, input, setOpen, alignment }} />
        </Suspense>
      </Box>
    </Box>
  );
};

export default PopUp;
