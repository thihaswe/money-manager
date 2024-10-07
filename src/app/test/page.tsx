import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import NumberGrid from "./Numpad"; // Adjust if necessary
import MyBarChart from "../(main)/(normal)/chart/chartToDisplay";
import { fetchNoteByUserId } from "@/lib/data";

const Test: React.FC = async () => {
  const notes = await fetchNoteByUserId(2);
  return (
    <Box>
      <MyBarChart rawData={notes} />
    </Box>
  );
};

export default Test;
