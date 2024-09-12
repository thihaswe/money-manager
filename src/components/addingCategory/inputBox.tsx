import { Box } from "@mui/material";
import React from "react";
interface Prop {
  selected: any;
}

const InputBox = ({ selected }: Prop) => {
  return (
    <Box sx={{ width: "100vw", bgcolor: "blue", flex: 2 }}>
      {selected && selected.name}
    </Box>
  );
};

export default InputBox;
