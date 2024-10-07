"use client";
import { AddCircle } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import PcPopUp from "../addingNote/pcPopUp";

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
    <Box>
      <Button
        sx={{
          width: "fit-content",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          margin: "0 auto",
          display: { xs: "none", md: "block" },
        }}
        onClick={() => {
          add();
        }}
      >
        <AddCircle sx={{ fontSize: 50 }} />
      </Button>
      {/* {pc pop } */}
      <Suspense fallback={<div>loading,,,</div>}>
        <PcPopUp prop={{ replace, pathname, setOpen, open }} />
      </Suspense>
    </Box>
  );
};

export default AddCategoryButton;
