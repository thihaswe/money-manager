import { Button } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import React from "react";
import { removeCategory } from "@/lib/action";

interface Prop {
  id: number;
}

export default function RemoveCategroy({ id }: Prop) {
  const removeCategoryWithId = removeCategory.bind(null, id);
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
