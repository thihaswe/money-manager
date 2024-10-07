"use client";

import { Box, Typography } from "@mui/material";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { isValidElement, ReactElement, useEffect, useState } from "react";
import InputBox from "./inputBox";

import { Icons } from "../buttons_and_icons/icons";
import React from "react";
import { IconTypes } from "@/type/iconType";
import { AddCircle } from "@mui/icons-material";
import { useAppSelector } from "@/store/hook";
import { Category, TitleName } from "@prisma/client";

interface Prop {
  setInput?: (para?: any) => void;
  input?: boolean;
  setOpen: (para: boolean) => void;
  alignment: string;
}
export default function ExpenseIncome({ prop }: { prop: Prop }) {
  const { alignment, setInput, input, setOpen } = prop;
  const [selected, setSelected] = useState(undefined);
  const params = useSearchParams();
  const pathname = usePathname().slice(1);
  const icons = Icons;
  const categories: Category[] = useAppSelector(
    (store) => store.category.categories
  );
  const category = categories.filter((cat) => {
    return (
      cat.title ===
      (alignment === "expense" ? TitleName.expense : TitleName.income)
    );
  });

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
        display: "flex",
        height: "100",
        flexDirection: "column",
        width: "100vw",
      }}
    >
      {/* {Expense/Income Icons and Categories} */}
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 5, // Gap between items
          }}
        >
          {category.map((cat) => {
            const iconToShow = icons.find((icon) => icon.id === cat.iconId);
            return (
              <Box
                key={cat.id}
                onClick={() => {
                  setSelected(cat);
                  setInput && setInput(true);
                }}
                sx={{
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  alignItems: "center",
                  width: "60px",
                  bgcolor: "grey",
                  height: "50px",
                  p: 1,
                  borderRadius: 5,
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                <Typography sx={{ flex: 1 }}>
                  {iconToShow && isValidElement(iconToShow.iconFile)
                    ? React.cloneElement(iconToShow.iconFile as ReactElement, {
                        style: { fontSize: 20 }, // Use style here for broad compatibility
                      })
                    : iconToShow.iconFile}
                </Typography>
                <Typography
                  noWrap={false}
                  sx={{
                    whiteSpace: "normal",
                    flex: 1,
                    overflow: "hidden",
                    fontSize: 10,
                  }}
                >
                  {cat.name}
                </Typography>
              </Box>
            );
          })}
          <Link
            href={`/category/edit?type=${params.get(
              "type"
            )}&pastPath=${pathname}`}
            onClick={() => {
              setInput && setInput(false);
              setSelected(undefined);
              setOpen(false);
            }}
          >
            <Box
              sx={{
                fontSize: { xs: 15, md: 35 },
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                alignItems: "center",
                width: "60px",
                bgcolor: "grey",
                height: "50px",
                borderRadius: 5,
                p: 1,
              }}
            >
              <AddCircle sx={{ fontSize: 40 }} />
            </Box>
          </Link>
        </Box>
      </Box>

      {selected && (
        <Box
          sx={{
            flex: { xs: 2 },
            bgcolor: "black",
            overflow: "auto",
          }}
        >
          <InputBox selected={selected} />
        </Box>
      )}
    </Box>
  );
}
