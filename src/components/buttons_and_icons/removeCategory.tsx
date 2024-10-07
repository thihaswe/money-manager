import { Button } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import React from "react";
import { removeCategory } from "@/lib/action";

interface Prop {
  id: number;
  pathToRevalidate: string;
}

export default function RemoveCategroy({ id, pathToRevalidate }: Prop) {
  const removeCategoryWithId = removeCategory.bind(null, id, pathToRevalidate);
  return (
    <form action={removeCategoryWithId}>
      <button
        style={{
          border: "none",
          backgroundColor: "inherit",
          cursor: "pointer",
        }}
      >
        <RemoveCircleOutlineIcon sx={{ fontSize: 35 }} />
      </button>
    </form>
  );
}
