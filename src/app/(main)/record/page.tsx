import RecordList from "@/components/pages/recordList";
import { auth } from "@/lib/auth";
import { fetchNoteByUserId } from "@/lib/data";
import { Box } from "@mui/material";

import { Note } from "@prisma/client";

const RecordPage = async () => {
  const { user } = await auth();
  const userId = Number(user.id);
  const notes: Note[] = await fetchNoteByUserId(userId);

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <RecordList notes={notes} />
    </Box>
  );
};

export default RecordPage;
