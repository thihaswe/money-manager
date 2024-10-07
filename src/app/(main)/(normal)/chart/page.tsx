import { auth } from "@/lib/auth";
import { fetchCategoryByType, fetchNoteByUserId } from "@/lib/data";
import React, { Suspense } from "react";
import MyBarChart from "./chartToDisplay";
import { Box } from "@mui/material";
import exp from "constants";

const ChartPage = async () => {
  const { user } = await auth();
  const userId = Number(user.id);
  const notes = await fetchNoteByUserId(userId);

  const expenseCategory = await fetchCategoryByType("expense", userId);

  const catIds = expenseCategory.map((cat) => cat.id);

  const expenseNotes = notes.filter((note) => catIds.includes(note.categoryId));

  return (
    <Box>
      <MyBarChart rawData={expenseNotes} />
    </Box>
  );
};

export default ChartPage;
