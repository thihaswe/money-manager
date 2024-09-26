import { IconTypes } from "@/type/iconType";
import { Box, Button, Input } from "@mui/material";
import { Category } from "@prisma/client";
import React, { isValidElement, ReactElement, useState } from "react";
import { Icons } from "../buttons_and_icons/icons";
import { addCategory } from "@/lib/action";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useFormState } from "react-dom";

interface Prop {
  selected: Category | IconTypes | any;
  setSelected?: (para?: any) => void;
}

// Type guard for Category
function isCategory(selected: any): selected is Category {
  return (
    selected !== undefined &&
    selected !== null &&
    typeof selected === "object" &&
    "name" in selected
  );
}

// Type guard for IconTypes
function isIconTypes(selected: any): selected is IconTypes {
  return (
    selected !== undefined &&
    selected !== null &&
    typeof selected === "object" &&
    "iconCategory" in selected &&
    "iconFile" in selected
  );
}

const InputBox = ({ selected, setSelected }: Prop) => {
  const [inputValue, setInputValue] = useState("");
  const [state, action] = useFormState(addCategory, undefined);
  const icons = Icons;
  const type = useSearchParams().get("type");
  const pathname = usePathname();
  const params = useSearchParams();
  const currentPath = pathname + "?" + params.toString();

  const handleNumberClick = (value: string) => {
    setInputValue((prev) => prev + value);
  };
  const handleClear = () => {
    setInputValue("");
  };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault(); // Prevent default form submission behavior

  //   const formData = new FormData(e.currentTarget);

  //   // Submit the form programmatically
  //   await addCategory(formData);

  //   // Reset the selected state to undefined if the setSelected prop is passed
  //   if (setSelected) {
  //     setSelected(undefined);
  //   }

  //   // Optionally clear the input field after submission
  //   setInputValue("");
  // };

  if (isCategory(selected)) {
    return (
      <Box
        sx={{
          width: "100%",
          bgcolor: "#001122",
          flex: 2,
          paddingBottom: 15,
        }}
      >
        {/* Category or IconTypes Display */}
        {isCategory(selected) && icons[selected.iconId - 1] && (
          <Box sx={{ display: "flex" }}>
            {icons.find((icon) => icon.id === selected.iconId).iconFile}
            {selected.name}
            <Box sx={{ margin: "20px 0" }}>
              <input
                type="text"
                value={inputValue}
                readOnly
                placeholder="Enter number"
                style={{
                  fontSize: "1em",
                  textAlign: "right",
                  border: "1px solid #ccc",
                }}
              />
            </Box>

            {/* Custom Number Pad */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "10px",
                width: "100%",
              }}
            >
              {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((number) => (
                <Button
                  key={number}
                  variant="contained"
                  onClick={() => handleNumberClick(number)}
                  sx={{
                    fontSize: "1.5em",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {number}
                </Button>
              ))}
              {["clear", "0", "delete"].map((action) => (
                <Button
                  key={action}
                  variant="contained"
                  onClick={() => {
                    if (action === "clear") {
                      handleClear(); // Call the handleClear function for "clear"
                    } else if (action === "delete") {
                      setInputValue((prev) => prev.slice(0, -1));
                    } else {
                      handleNumberClick(action); // Call handleNumberClick for "0"
                    }
                  }}
                  sx={{
                    fontSize: "1.5em",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor:
                      action === "clear"
                        ? "red"
                        : "" || action === "delete"
                        ? "orange"
                        : "",

                    "&:hover": {
                      bgcolor:
                        action === "clear"
                          ? "red"
                          : action === "delete"
                          ? "orange"
                          : "",
                    },
                  }}
                >
                  {action}
                </Button>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    );
  } else if (isIconTypes(selected))
    return (
      <Box
        sx={{
          width: "100%",
          bgcolor: "#001122",
        }}
      >
        {isIconTypes(selected) && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Box>
              {React.isValidElement(selected.iconFile)
                ? React.cloneElement(selected.iconFile as ReactElement, {
                    style: { fontSize: 50 }, // Use style here for broad compatibility
                  })
                : selected.iconFile}
            </Box>
            <Box sx={{ margin: "20px 0" }}>
              <form action={action}>
                <Input name="selected" value={selected.id} type="hidden" />
                <Input name="type" value={type} type="hidden" />
                <Input name="currentPath" value={currentPath} type="hidden" />
                {/* {need to add user informations} */}
                <Input
                  onChange={(e) => {
                    setInputValue(e.target.value);
                  }}
                  type="text"
                  name="categoryName"
                  placeholder="add new category"
                  value={inputValue}
                  style={{
                    color: "white",
                    fontSize: "1em",
                    textAlign: "right",
                    border: "1px solid black",
                    padding: 5,
                  }}
                />
                <button style={{ marginLeft: 50 }} type="submit">
                  Ok
                </button>
                {state?.success &&
                  state.success &&
                  redirect(currentPath.toString())}
                {state?.error && state.error}
              </form>
            </Box>
          </Box>
        )}
      </Box>
    );
};

export default InputBox;
