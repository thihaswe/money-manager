import React from "react";
import { Box, Typography, Button, Input } from "@mui/material";

interface Prop {
  onClose: () => void; // Function to close numpad
}

const NumberGrid: React.FC<Prop> = ({ onClose }) => {
  // Create an array of numbers for the numpad

  return (
    <form action="">
      <Input name="pathname" value={"hi"} type="hidden" />
      <Input name="categoryId" value={"selected"} type="hidden" />
      <Input value={"datd"} type="hidden" name="userId" />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Typography> hello</Typography>
        <input
          name="amount"
          type="text"
          value={"inputValue"}
          readOnly
          placeholder="Enter number"
          style={{
            fontSize: "1em",
            textAlign: "right",
            border: "1px solid #ccc",
          }}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)", // 3 columns of 100px each
          gap: "20px", // Gap between items
          justifyContent: "center", // Center the grid horizontally
          alignItems: "center", // Center items vertically
          padding: "20px", // Padding around the grid
          bgcolor: "white", // Background color for the numpad
          borderRadius: "8px",
          backgroundColor: "red", // Optional: rounded corners
        }}
      >
        {[
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "clear",
          "0",
          "delete",
        ].map((number) => (
          <Button
            key={number}
            variant="contained"
            sx={{
              width: "100%",
              height: "100px",
              bgcolor: "grey.300", // Background color
              "&:hover": {
                bgcolor: "grey.400", // Change color on hover
              },
            }}
          >
            {number}
          </Button>
        ))}
        {/* Submit button that spans 3 columns */}
        <Button
          variant="contained"
          sx={{
            gridColumn: "span 3", // Span 3 columns
            width: "100%", // Full width
            height: "100px",
            bgcolor: "primary.main", // Primary color for submit
            "&:hover": {
              bgcolor: "primary.dark", // Change color on hover
            },
          }}
          onClick={onClose} // Call onClose when clicked
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default NumberGrid;
