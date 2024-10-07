"use client";
import { AddCircle } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PopUp from "../addingNote/popUp";

const AddCategoryButton = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const toOpen = searchParams.get("open");
  const type = searchParams.get("type");

  const [open, setOpen] = useState(false);

  useEffect(() => {
    toOpen && add(type);
  }, [toOpen]);

  const add = (type?) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("type", type || "expense");
    replace(`${pathname}?${newParams.toString()}`);
    setOpen(true);
  };
  return (
    <Box sx={{ width: "100vw", display: "flex", justifyContent: "center" }}>
      <Button
        onClick={() => {
          add();
        }}
        sx={{}}
      >
        <AddCircle sx={{ fontSize: 50 }} />
      </Button>
      {/* {pc pop } */}

      <PopUp prop={{ replace, pathname, setOpen, open }} />
    </Box>
  );
};

export default AddCategoryButton;
