"use client";
import { funcIcons } from "@/lib/data";
import { AddCircle } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import IconSelection from "./iconSelection";
import { useState } from "react";

const AddNewCategory = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 5,
      }}
    >
      {/* {button to add cat} */}
      <Button
        sx={{
          width: "80%",
          bgcolor: "white",
          fontSize: 30,
          mb: 5,
          color: "black", // Ensure the text color contrasts with the background
          transition: "all 0.3s ease", // Ensure smooth transition for both hover and normal states
          "&:hover": {
            bgcolor: "darkgrey", // Change background color on hover
            transform: "scale(1.05)", // Slightly increase the size on hover
          },
        }}
        onClick={() => {
          setOpen(true);
        }}
      >
        <AddCircle sx={{ fontSize: 50 }} />
        AddNewCategory
      </Button>
      {/* {all icons components} */}
      <IconSelection prop={{ open, setOpen }} />
    </Box>
  );
};

export default AddNewCategory;
