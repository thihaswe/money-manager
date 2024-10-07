"use client";

import {
  Box,
  CircularProgress,
  Input,
  Typography,
  Divider,
} from "@mui/material";
import { Category, Note, TitleName } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Icons } from "../buttons_and_icons/icons";
import { IconTypes } from "@/type/iconType";
import { useAppSelector } from "@/store/hook";
import OneIconToShow from "../buttons_and_icons/oneIcontToShow";

interface Prop {
  notes: Note[];
}

const RecordList = ({ notes }: Prop) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<string>("");
  const tdy = new Date();
  const month = String(tdy.getMonth() + 1).padStart(2, "0");
  const year = tdy.getFullYear();
  const formattedMonth = `${year}-${month}`;
  const categories = useAppSelector((store) => store.category.categories);
  const icons: IconTypes[] = Icons;

  useEffect(() => {
    setDate(formattedMonth);
  }, [formattedMonth]);

  useEffect(() => {
    if (notes) {
      setLoading(false);
    }
  }, [notes]);

  // Filter notes by the selected month
  const filteredNotes = notes.filter((note) => {
    const noteDate = new Date(note.createdAt);
    const noteMonth = String(noteDate.getMonth() + 1).padStart(2, "0");
    const noteYear = noteDate.getFullYear();
    const noteFormattedMonth = `${noteYear}-${noteMonth}`;

    return noteFormattedMonth === date;
  });

  // Calculate the total for filtered notes
  const totalExpense = filteredNotes.reduce((acc, note) => {
    const cat = categories.find(
      (cat) => cat.id === note.categoryId
    ) as Category;

    if (cat && cat.title === TitleName.expense) {
      acc += note.amount;
    }
    return acc;
  }, 0);

  const totalIncome = filteredNotes.reduce((acc, note) => {
    const cat = categories.find(
      (cat) => cat.id === note.categoryId
    ) as Category;

    if (cat && cat.title === TitleName.income) {
      acc += note.amount;
    }
    return acc;
  }, 0);

  // Group notes by day
  const notesGroupedByDay = filteredNotes.reduce((acc, note) => {
    const noteDate = new Date(note.createdAt).toLocaleDateString(); // Format as a readable date
    if (!acc[noteDate]) acc[noteDate] = [];
    acc[noteDate].push(note);
    return acc;
  }, {} as Record<string, Note[]>);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
        <Typography>Loading data...</Typography>
      </Box>
    );
  } else if (notes.length === 0 && categories.length === 0) {
    return <Box>No notes available.</Box>;
  } else if (filteredNotes.length === 0) {
    return (
      <Box>
        <Input
          type="month"
          value={date}
          onChange={(e) => setDate(e.target.value)} // Update the selected date
        />
        <Typography>No notes for this month.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100%",
        fontSize: 15,
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Input to change the month */}
      <Box>
        <Input
          type="month"
          value={date}
          onChange={(e) => setDate(e.target.value)} // Update the selected date
        />
        {/* Total amount displayed at the top */}
        <Box
          sx={{
            mr: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          {/* Container for Income and Expense */}
          <Box
            sx={{
              display: "flex",
              width: { xs: "100%", sm: "50%", md: "20%" },
              alignItems: "space-between",
              flexDirection: "column",
            }}
          >
            {/* Total Income and Income */}
            <Box
              sx={{
                display: "flex",
                flex: 1,
                justifyContent: { xs: "space-between" },
              }}
            >
              <Typography>Total Income:</Typography>
              <Typography sx={{ textAlign: "right" }}>{totalIncome}</Typography>
            </Box>
            {/* Total Expense and Expense */}
            <Box
              sx={{
                display: "flex",
                flex: 1,
                justifyContent: { xs: "space-between" },
              }}
            >
              <Typography>Total Expense:</Typography>
              <Typography sx={{ textAlign: "right" }}>
                {totalExpense}
              </Typography>
            </Box>
            <Divider sx={{ border: 1 }} />
            <Box
              sx={{
                display: "flex",
                flex: 1,
                justifyContent: { xs: "space-between" },
              }}
            >
              <Typography>Total :</Typography>
              <Typography sx={{ textAlign: "right" }}>
                {totalIncome - totalExpense}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* Notes grouped by day */}
      <Box
        sx={{
          display: "flex",
          overflow: "auto",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {Object.entries(notesGroupedByDay).map(([day, notesForDay], index) => (
          <Box
            key={day}
            sx={{
              mb:
                index === Object.entries(notesGroupedByDay).length - 1
                  ? { md: "60px" }
                  : 0,
            }}
          >
            {/* Show day */}
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {day}
            </Typography>
            {/* List of notes for the day */}
            {notesForDay.map((note) => {
              const category: Category | undefined = categories.find(
                (cat) => cat.id === note.categoryId
              );
              return category ? (
                <Box
                  key={note.id}
                  sx={{
                    display: "flex",
                    mb: 1,
                    textAlign: "center",
                  }}
                >
                  <Box sx={{ flex: 1, display: "flex" }}>
                    <Typography sx={{ flex: 1 }}>{category.title}</Typography>

                    <OneIconToShow iconId={category.iconId} size={20} />
                  </Box>
                  <Typography sx={{ flex: 1 }}>{category.name}</Typography>
                  <Typography
                    sx={{
                      flex: 1,
                      color:
                        category.title === TitleName.income ? "green" : "red",
                    }}
                  >
                    {note.amount}
                  </Typography>
                </Box>
              ) : null;
            })}
            {/* Add a divider between days */}
            {index < Object.entries(notesGroupedByDay).length - 1 && (
              <Divider sx={{ my: 2 }} />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RecordList;
