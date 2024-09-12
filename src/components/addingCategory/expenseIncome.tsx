import { Box, Button } from "@mui/material";

import React, { useEffect, useState } from "react";
import InputBox from "./inputBox";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface Prop {
  category: any[];
  setInput?: (para?: any) => void;
  input?: boolean;
  setOpen: (para: boolean) => void;
}
export default function ExpenseIncome({ prop }: { prop: Prop }) {
  const { category, setInput, input, setOpen } = prop;
  const [selected, setSelected] = useState(undefined);
  const params = useSearchParams();
  const pathname = usePathname().slice(1);
  // const newParams = new URLSearchParams(searchParams);
  // newParams.set("type");
  useEffect(() => {
    if (!input) {
      setSelected(undefined);
    }
  }, [input]);

  return (
    <Box
      sx={{
        height: "100%",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          overflow: "auto",
          flexWrap: "wrap",
          gap: 2,
          padding: 5,
          marginBottom: 10,
          flex: 1,
        }}
      >
        {category.map((cat, index) => {
          return (
            <Box
              onClick={(e) => {
                setSelected(cat);
                setInput(true);
              }}
            >
              {cat.name}
            </Box>
          );
        })}
        <Link
          href={`/category/edit?type=${params.get(
            "type"
          )}&pastPath=${pathname}`}
          onClick={() => {
            setInput(false);
            setSelected(undefined);
            setOpen(false);
          }}
        >
          <Box>add</Box>
        </Link>
        ;
      </Box>
      {input && <InputBox selected={selected} />}
    </Box>
  );
}
