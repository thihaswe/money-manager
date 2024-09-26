"use client";
import { funcIcons } from "@/lib/data";
import { Box, Button, Typography } from "@mui/material";
import React, { isValidElement, ReactElement, useState } from "react";
import { Icons } from "../buttons_and_icons/icons";
import InputBox from "../addingNote/inputBox";

interface Prop {
  open: boolean;
  setOpen: (para?: any) => void;
}

const IconSelection = ({ prop }: { prop: Prop }) => {
  const { open, setOpen } = prop;
  const [selected, setSelected] = useState(undefined);
  const icons = Icons;
  // const iconsCategory = [...new Set(icons.map((icon) => icon.iconCategory))];
  const iconsToShow = funcIcons(icons);
  return (
    <Box
      sx={{
        position: "fixed", // Use fixed positioning to cover the whole screen
        width: "100vw",
        height: open ? "100%" : 0,
        bgcolor: "black",
        color: "white",
        bottom: open ? 0 : "", // Ensure it sticks to the top when opened
        left: 0, // Ensure it covers the whole width
        transition: "height 0.3s ease",
        flexDirection: "column",
        // Smooth opening animation
      }}
    >
      <Button
        sx={{}}
        onClick={() => {
          setOpen(false);
          setSelected(undefined);
        }}
      >
        <Typography>cancel</Typography>
      </Button>

      <Box sx={{ display: "flex", height: "90vh", flexDirection: "column" }}>
        <Box sx={{ flex: 3, overflow: "auto" }}>
          {/* {icon selection} */}
          {iconsToShow.map((item) => {
            return (
              <Box
                key={item.iconCategoryName.name}
                sx={{ paddingX: 10, mb: 10 }}
              >
                <Typography
                  key={item.iconCategoryName.name}
                  sx={{ width: "fit-content", margin: "0 auto" }}
                  variant="h5"
                >
                  {item.iconCategoryName.name}
                </Typography>
                <Box sx={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  {item.icons.map((icon) => {
                    return (
                      <Typography
                        sx={{ cursor: "pointer" }}
                        key={icon.id}
                        onClick={() => {
                          setSelected(icon);
                        }}
                      >
                        {isValidElement(icon.iconFile)
                          ? React.cloneElement(icon.iconFile as ReactElement, {
                              style: { fontSize: 30 }, // Use style here for broad compatibility
                            })
                          : icon.iconFile}
                      </Typography>
                    );
                  })}
                </Box>
              </Box>
            );
          })}
        </Box>

        {selected && <InputBox selected={selected} setSelected={setSelected} />}
      </Box>
    </Box>
  );
};

export default IconSelection;
