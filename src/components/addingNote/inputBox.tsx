// "use client";
// import { addCategory, addnewNote } from "@/lib/action";
// import { IconTypes } from "@/type/iconType";
// import { Box, Button, Input, Typography } from "@mui/material";
// import { Category } from "@prisma/client";
// import { redirect, usePathname, useSearchParams } from "next/navigation";
// import React, { ReactElement, useEffect, useState } from "react";
// import { useFormState } from "react-dom";
// import { Icons } from "../buttons_and_icons/icons";
// import { useSession } from "next-auth/react";
// import { BusAlertTwoTone } from "@mui/icons-material";
// import { revalidatePath } from "next/cache";
// import { oneIcon } from "@/lib/util";

// interface Prop {
//   selected: Category | IconTypes;
//   setSelected?: (para?: any) => void;
// }

// // Type guard for Category
// function isCategory(selected: any): selected is Category {
//   return (
//     selected !== undefined &&
//     selected !== null &&
//     typeof selected === "object" &&
//     "name" in selected
//   );
// }

// // Type guard for IconTypes
// function isIconTypes(selected: any): selected is IconTypes {
//   return (
//     selected !== undefined &&
//     selected !== null &&
//     typeof selected === "object" &&
//     "iconCategory" in selected &&
//     "iconFile" in selected
//   );
// }

// const InputBox = ({ selected, setSelected }: Prop) => {
//   console.log(selected);
//   const [inputValue, setInputValue] = useState("");
//   const [state, action] = useFormState(addCategory, undefined);
//   const [dataState, dataAction] = useFormState(addnewNote, undefined);
//   const icons = Icons;
//   const type = useSearchParams().get("type");
//   const pathname = usePathname();
//   const params = useSearchParams();
//   const currentPath = pathname + "?" + params.toString();
//   const { data, status } = useSession();
//   const numbers = [
//     "1",
//     "2",
//     "3",
//     "4",
//     "5",
//     "6",
//     "7",
//     "8",
//     "9",
//     "clear",
//     "0",
//     "delete",
//   ];

//   const handleNumberClick = (value: string) => {
//     setInputValue((prev) => prev + value);
//   };
//   const handleClear = () => {
//     setInputValue("");
//   };

//   const handleDelete = () => {
//     setInputValue((prev) => prev.slice(0, -1)); // Remove the last character
//   };
//   if (isCategory(selected)) {
//     return (
//       <form action={dataAction} style={{ height: "100%" }}>
//         <Input name="pathname" value={pathname} type="hidden" />
//         <Input name="categoryId" value={selected.id} type="hidden" />
//         <Input value={data?.user.id} type="hidden" name="userId" />
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             gap: 5,
//             mb: 2,
//           }}
//         >
//           {icons.find((icon) => icon.id === selected.iconId)?.iconFile}
//           <Typography>{selected.name}</Typography>
//           <input
//             name="amount"
//             type="text"
//             value={inputValue}
//             readOnly
//             placeholder="Enter number"
//             style={{
//               textAlign: "right",
//               fontSize: "1em",
//               border: "1px solid #ccc",
//             }}
//           />
//         </Box>

//         {/* {custom num pad} */}
//         <Box
//           sx={{
//             display: "flex",
//             flexWrap: "wrap",
//             justifyContent: "center",
//             resize: "both",
//           }}
//         >
//           {numbers.map((number) => (
//             <Button
//               key={number}
//               variant="contained"
//               onClick={() => {
//                 if (number === "clear") {
//                   handleClear();
//                 } else if (number === "delete") {
//                   handleDelete();
//                 } else {
//                   handleNumberClick(number);
//                 }
//               }}
//               sx={{
//                 width: "calc(100vw / 3)",
//                 height: "30px",
//                 bgcolor:
//                   number === "clear"
//                     ? "red"
//                     : number === "delete"
//                     ? "blue"
//                     : "grey",
//                 "&:hover": {
//                   bgcolor:
//                     number === "clear"
//                       ? "rgba(255, 0, 0, 0.8)"
//                       : number === "delete"
//                       ? "rgba(0, 0, 255, 0.8)"
//                       : "grey",
//                 },
//               }}
//             >
//               {number}
//             </Button>
//           ))}
//           <Box
//             sx={{
//               width: "100%",
//               padding: "10px", // Adjust padding for better spacing
//             }}
//           >
//             <Button
//               type="submit"
//               variant="contained"
//               sx={{
//                 width: "100%",
//                 height: "30px", // Adjust height for better visibility
//                 bgcolor: "primary.main",
//                 "&:hover": {
//                   bgcolor: "primary.dark",
//                 },
//               }}
//             >
//               Submit
//             </Button>
//           </Box>
//         </Box>
//         {/* <Box
//           sx={{
//             width: "100%",
//             display: "grid",
//             gridTemplateColumns: "auto auto auto",
//             gap: "10px",
//             justifyContent: "center",
//             alignItems: "center",
//             borderRadius: "8px",
//           }}
//         >
//           {numbers.map((number) => (
//             <Button
//               key={number}
//               variant="contained"
//               onClick={() => {
//                 if (number === "clear") {
//                   handleClear();
//                 } else if (number === "delete") {
//                   handleDelete();
//                 } else {
//                   handleNumberClick(number);
//                 }
//               }}
//               sx={{
//                 width: "100%",
//                 bgcolor:
//                   (number === "clear" && "red") ||
//                   (number === "delete" && "blue") ||
//                   "grey",
//                 "&:hover": {
//                   bgcolor:
//                     number === "clear"
//                       ? "rgba(255, 0, 0, 0.8)"
//                       : number === "delete"
//                       ? "rgba(0, 0, 255, 0.8)"
//                       : "grey",
//                 },
//               }}
//             >
//               {number}
//             </Button>
//           ))}
//           <Button
//             type="submit"
//             variant="contained"
//             sx={{
//               width: "100%",
//               bgcolor: "primary.main",
//               "&:hover": {
//                 bgcolor: "primary.dark",
//               },
//               gridColumn: "span 3",
//             }}
//           >
//             Submit
//           </Button>
//         </Box> */}

//         {dataState?.success && (
//             <Typography sx={{ color: "green" }}>{dataState.success}</Typography>
//           ) &&
//           redirect(pathname.toString())}
//         {dataState?.error && (
//           <Typography sx={{ color: "red" }}> {dataState.error}</Typography>
//         )}
//       </form>
//     );
//   } else if (isIconTypes(selected))
//     return (
//       <Box
//         sx={{
//           width: "100%",
//           bgcolor: "#001122",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           gap: 10,
//         }}
//       >
//         <Box>
//           {React.isValidElement(selected.iconFile)
//             ? React.cloneElement(selected.iconFile as ReactElement, {
//                 style: { fontSize: 50 }, // Use style here for broad compatibility
//               })
//             : selected.iconFile}
//         </Box>
//         <Box sx={{ margin: "20px 0" }}>
//           <form action={action}>
//             <Input name="selected" value={selected.id} type="hidden" />
//             <Input name="type" value={type} type="hidden" />
//             <Input name="currentPath" value={currentPath} type="hidden" />
//             {/* <Input value={data.user.id} type="hidden" name="userId" /> */}
//             {/* {need to add user informations} */}
//             <Input
//               onChange={(e) => {
//                 setInputValue(e.target.value); // Allow only if the input is 15 characters or less
//               }}
//               type="text"
//               inputProps={{ maxLength: 15 }}
//               name="categoryName"
//               placeholder="add new category"
//               value={inputValue}
//               style={{
//                 color: "white",
//                 fontSize: "1em",
//                 textAlign: "right",
//                 border: "1px solid black",
//                 padding: 5,
//               }}
//             />
//             <button style={{ marginLeft: 50 }} type="submit">
//               Ok
//             </button>
//             {state?.success && (
//                 <Typography sx={{ color: "green" }}>{state.success}</Typography>
//               ) &&
//               redirect(currentPath.toString())}
//             {state?.error && (
//               <Typography sx={{ color: "red" }}> {state.error}</Typography>
//             )}
//           </form>
//         </Box>
//       </Box>
//     );
// };

// export default InputBox;

"use client";
import { addCategory, addnewNote } from "@/lib/action";
import { IconTypes } from "@/type/iconType";
import { Box, Button, Grid, Input, Typography } from "@mui/material";
import { Category } from "@prisma/client";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import React, { ReactElement, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { Icons } from "../buttons_and_icons/icons";
import { useSession } from "next-auth/react";

interface Prop {
  selected: Category | IconTypes;
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

const InputBox = ({ selected, setSelected }: Prop) => {
  console.log(selected);
  const [inputValue, setInputValue] = useState("");
  const [state, action] = useFormState(addCategory, undefined);
  const [dataState, dataAction] = useFormState(addnewNote, undefined);
  const icons = Icons;
  const type = useSearchParams().get("type");
  const pathname = usePathname();
  const params = useSearchParams();
  const currentPath = pathname + "?" + params.toString();
  const { data } = useSession();
  const numbers = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "clear",
    "0",
    "delete",
  ];

  const handleNumberClick = (value: string) => {
    setInputValue((prev) => prev + value);
  };
  const handleClear = () => {
    setInputValue("");
  };

  const handleDelete = () => {
    setInputValue((prev) => prev.slice(0, -1)); // Remove the last character
  };

  if (isCategory(selected)) {
    return (
      <form action={dataAction} style={{}}>
        <Input name="pathname" value={pathname} type="hidden" />
        <Input name="categoryId" value={selected.id} type="hidden" />
        <Input value={data?.user.id} type="hidden" name="userId" />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            mb: 2,
          }}
        >
          {icons.find((icon) => icon.id === selected.iconId)?.iconFile}
          <Typography>{selected.name}</Typography>
          <input
            name="amount"
            type="text"
            value={inputValue}
            readOnly
            placeholder="Enter number"
            style={{
              textAlign: "right",
              fontSize: "1em",
              border: "1px solid #ccc",
            }}
          />
        </Box>
        {/* Custom number pad with overflow support */}
        {/* <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            overflowY: "auto",
            maxHeight: "300px",
            gap: 1,
          }}
        >
          {numbers.map((number) => (
            <Button
              key={number}
              variant="contained"
              onClick={() => {
                if (number === "clear") {
                  handleClear();
                } else if (number === "delete") {
                  handleDelete();
                } else {
                  handleNumberClick(number);
                }
              }}
              sx={{
                width: "calc(90vw / 3)",
                height: "40px", // Adjust height for better visibility
                bgcolor:
                  number === "clear"
                    ? "red"
                    : number === "delete"
                    ? "blue"
                    : "grey",
                "&:hover": {
                  bgcolor:
                    number === "clear"
                      ? "rgba(255, 0, 0, 0.8)"
                      : number === "delete"
                      ? "rgba(0, 0, 255, 0.8)"
                      : "grey",
                },
              }}
            >
              {number}
            </Button>
          ))}
          <Box
            sx={{
              width: "100%",
              padding: "10px", // Adjust padding for better spacing
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "100%",
                height: "40px", // Adjust height for better visibility
                bgcolor: "primary.main",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </Box> */}
        {/* import {(Box, Button, Grid)} from "@mui/material"; // Example numbers
        array const numbers = ["1", "2", "3", "clear", "4", "5", "6", "delete",
        "7", "8", "9", "0"]; */}
        {/* Custom number pad with overflow support */}
        <Box
          sx={{
            overflowY: "auto",
            maxHeight: "300px",
            padding: 1, // Add padding to the box for spacing
          }}
        >
          <Grid container spacing={1} justifyContent="center">
            {numbers.map((number) => (
              <Grid item xs={4} key={number}>
                {" "}
                {/* Adjust the number of columns as needed */}
                <Button
                  variant="contained"
                  onClick={() => {
                    if (number === "clear") {
                      handleClear();
                    } else if (number === "delete") {
                      handleDelete();
                    } else {
                      handleNumberClick(number);
                    }
                  }}
                  sx={{
                    width: "100%", // Ensure button takes full width of the grid item
                    height: "40px", // Adjust height for better visibility
                    bgcolor:
                      number === "clear"
                        ? "red"
                        : number === "delete"
                        ? "blue"
                        : "grey",
                    "&:hover": {
                      bgcolor:
                        number === "clear"
                          ? "rgba(255, 0, 0, 0.8)"
                          : number === "delete"
                          ? "rgba(0, 0, 255, 0.8)"
                          : "grey",
                    },
                  }}
                >
                  {number}
                </Button>
              </Grid>
            ))}
            <Grid item xs={12}>
              {" "}
              {/* Submit button spans full width */}
              <Box sx={{ padding: "10px" }}>
                {" "}
                {/* Adjust padding for better spacing */}
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    width: "100%",
                    height: "40px", // Adjust height for better visibility
                    bgcolor: "primary.main",
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        {/* Display success or error messages */}
        {dataState?.success && (
            <Typography sx={{ color: "green" }}>{dataState.success}</Typography>
          ) &&
          redirect(pathname.toString())}
        {dataState?.error && (
          <Typography sx={{ color: "red" }}>{dataState.error}</Typography>
        )}
      </form>
    );
  } else {
    return null;
  }
};

export default InputBox;
