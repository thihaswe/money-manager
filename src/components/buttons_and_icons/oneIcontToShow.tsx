import { oneIcon } from "@/lib/util";
import { Box } from "@mui/material";
import React, { isValidElement, ReactElement } from "react";

const OneIconToShow = ({ iconId, size }: { iconId: number; size: number }) => {
  const iconToShow = oneIcon(iconId);

  return (
    <Box>
      {iconToShow && isValidElement(iconToShow.iconFile)
        ? React.cloneElement(iconToShow.iconFile as ReactElement, {
            style: { fontSize: size || 30 }, // Use style here for broad compatibility
          })
        : iconToShow.iconFile}
    </Box>
  );
};

export default OneIconToShow;
