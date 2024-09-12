import AdbIcon from "@mui/icons-material/Adb";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Image from "next/image";
import Link from "next/link";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function PcNavbar() {
  const links = [
    { href: "/record", label: "Record" },
    { href: "/chart", label: "Chart" },
    { href: "/report", label: "Report" },
  ];
  const user = true;

  return (
    <AppBar
      position="static"
      sx={{
        height: 80,
        bgcolor: "gray",
        display: { xs: "none", md: "block" },
      }}
    >
      <Container maxWidth="xl" sx={{ padding: 0, height: "100%" }}>
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
          }}
        >
          {/* left side */}
          <Box sx={{ display: "flex", alignItems: "center", flex: 2 }}>
            <Link
              href={"/record"}
              style={{ display: "flex", alignItems: "center" }}
            >
              <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Money Manager
              </Typography>
            </Link>
          </Box>
          {/* right side */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flex: 1,
              alignItems: "center",
            }}
          >
            {links.map((link) => {
              return (
                <Link href={link.href} key={link.href}>
                  <Typography
                    noWrap
                    sx={{
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              );
            })}

            {user ? (
              <Link href={"/profile"}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    position: "relative",
                    borderRadius: "50%", // Ensures the box is circular
                    overflow: "hidden", // Ensures the image is clipped to the circle
                  }}
                >
                  <Image src={"/noavatar.jpg"} alt={"user image"} fill={true} />
                </Box>
              </Link>
            ) : (
              <Link href={"/login"}>
                <Typography
                  noWrap
                  sx={{
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Log In
                </Typography>
              </Link>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default PcNavbar;
