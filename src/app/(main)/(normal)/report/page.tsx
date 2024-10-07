import { auth } from "@/lib/auth";
import { fetchNoteByUserId } from "@/lib/data";
import React from "react";

const ReportPage = async () => {
  const { user } = await auth();

  const userId = Number(user.id);
  const data = await fetchNoteByUserId(userId);

  return <div>ReportPage</div>;
};

export default ReportPage;
