"use client";
import { AddCircle } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import IconSelection from "./iconSelection";

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
        <AddCircle sx={{ fontSize: 30 }} />
        <Typography sx={{ fontSize: { xs: 15, sm: 25, md: 35, lg: 40 } }}>
          AddNewCategory
        </Typography>
      </Button>
      {/* {all icons components} */}
      {open && <IconSelection prop={{ open, setOpen }} />}
    </Box>
  );
};

export default AddNewCategory;
