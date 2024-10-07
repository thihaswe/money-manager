"use client";
import { updateCategory } from "@/lib/action";
import { oneIcon } from "@/lib/util";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Input, Typography } from "@mui/material";
import { Category } from "@prisma/client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { isValidElement, ReactElement } from "react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

interface Prop {
  category: Category;
}

const CategoryForm = ({ category }: Prop) => {
  const query = useSearchParams();
  const type = query.get("type");
  const pastPath = query.get("pastPath");
  const router = useRouter();
  const path = usePathname();
  const pathToRevalidate = path.toString() + "?" + query.toString();

  const iconToShow = oneIcon(category.iconId);

  const updateCategoryById = updateCategory.bind(
    null,
    category.id,
    pathToRevalidate
  );
  const [state, action] = useFormState(updateCategoryById, undefined);
  // if (state && state.success === "category Updated") {
  //   // Redirect after successful update
  //   setTimeout(() => {
  //     router.push(`/category/edit?open=true&type=${type}&pastPath=${pastPath}`);
  //   }, 3000);
  // }
  const [countdown, setCountdown] = useState<number | null>(null); // State for countdown timer

  useEffect(() => {
    if (state?.success === "category Updated") {
      setCountdown(3); // Start countdown at 3 seconds

      const intervalId = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(intervalId); // Clear interval when countdown is complete
            router.push(
              `/category/edit?open=true&type=${type}&pastPath=${pastPath}`
            );
          }
          return prev !== null ? prev - 1 : null;
        });
      }, 1000);

      return () => clearInterval(intervalId); // Cleanup interval when component unmounts
    }
  }, [state?.success, router, type, pastPath]);

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <Link href={`/category/edit?open=true&type=${type}&pastPath=${pastPath}`}>
        <ArrowBackIcon sx={{ fontSize: 55, marginLeft: 3 }} />
      </Link>

      <form
        action={action}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 50,
          justifyContent: "center",
          height: "80%",
        }}
      >
        <Typography variant="h3" sx={{ margin: "0 auto" }}>
          {type === "expense" ? "Expenese" : "Income"}
        </Typography>
        {iconToShow && isValidElement(iconToShow.iconFile)
          ? React.cloneElement(iconToShow.iconFile as ReactElement, {
              style: { fontSize: 70 }, // Use style here for broad compatibility
            })
          : iconToShow.iconFile}
        {/* {iconToShow.iconFile} */}
        <Input defaultValue={category.name} name="categoryName" />
        <button type="submit">Update</button>
        <>
          {state?.success && (
            <Typography sx={{ color: "green" }}> {state.success}</Typography>
          )}
          {countdown !== null && (
            <Typography sx={{ color: "blue" }}>
              Redirecting in {countdown} second{countdown !== 1 ? "s" : ""}...
            </Typography>
          )}
        </>
        {state?.error && (
          <Typography sx={{ color: "red" }}> {state.error}</Typography>
        )}
      </form>
    </Box>
  );
};

export default CategoryForm;
