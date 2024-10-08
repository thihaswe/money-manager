"use client";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SummarizeIcon from "@mui/icons-material/Summarize";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import PopUp from "../addingNote/popUp";

const PhoneNavbar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [open, setOpen] = useState(false);
  const toOpen = searchParams.get("open");
  const type = searchParams.get("type");

  useEffect(() => {
    toOpen && add(type);
  }, [toOpen]);

  const user = true;
  const leftLink = [
    { href: "/record", label: "Record", icon: <ReceiptLongIcon /> },
    { href: "/chart", label: "Chart", icon: <InsertChartIcon /> },
  ];

  const rightLink = [
    { href: "/report", label: "Report", icon: <SummarizeIcon /> },
    { href: "/profile", label: "Profile", icon: <AccountBoxIcon /> },
  ];

  const add = (type?) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("type", type || "expense");
    replace(`${pathname}?${newParams.toString()}`);
    setOpen(true);
  };

  return (
    <AppBar
      sx={{
        bgcolor: "gray",
        display: { xs: "block", md: "none" },
        padding: 0,
        margin: 0,
        position: "static",
        height: "60px",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* left side */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              flex: 2,
              alignItems: "center",
              "& > *:first-of-type": {
                borderLeft: "1px solid black", // Applying style to the first child inside the Box
              },
            }}
          >
            {leftLink.map((link) => {
              return (
                <Link
                  href={link.href}
                  key={link.href}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRight: "1px solid black",
                  }}
                >
                  <> {link.icon}</>
                  <Typography
                    noWrap
                    sx={{
                      color: "inherit",
                      fontSize: 15,
                      textDecoration: "none",
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              );
            })}
          </Box>
          {/* middle  */}

          <Button
            sx={{ flex: 1 }}
            onClick={() => {
              add();
            }}
          >
            <AddCircleOutlineIcon
              sx={{
                fontSize: 50,
                color: "black",
              }}
            />
          </Button>

          {/* right side */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              flex: 2,
              alignItems: "center",
              "& > *:first-of-type": {
                borderLeft: "1px solid black", // Applying style to the first child inside the Box
              },
            }}
          >
            {rightLink.map((link) => {
              return (
                <Link
                  href={link.href}
                  key={link.href}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRight: "1px solid black",
                  }}
                >
                  <> {link.icon}</>
                  <Typography
                    noWrap
                    sx={{
                      fontSize: 15,
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              );
            })}
          </Box>
        </Toolbar>
      </Container>

      {/* add item */}
      <Suspense>
        <PopUp prop={{ replace, pathname, setOpen, open }} />
      </Suspense>
    </AppBar>
  );
};

export default PhoneNavbar;
