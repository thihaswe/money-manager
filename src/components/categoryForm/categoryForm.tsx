"use client";
import { updateCategory } from "@/lib/action";
import { Box, Input } from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useFormState } from "react-dom";

interface Prop {
  category: any;
}

const CategoryForm = ({ category }: Prop) => {
  const query = useSearchParams();
  const type = query.get("type");
  const pastPath = query.get("pastPath");
  const router = useRouter();

  const updateCategoryById = updateCategory.bind(null, category.id);
  const [state, action] = useFormState(updateCategoryById, undefined);
  if (state && state.message === "done") {
    // Redirect after successful update
    router.push(`/category/edit?open=true&type=${type}&pastPath=${pastPath}`);
  }

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
        <Input defaultValue={category.name} name="categoryName" />
        <button type="submit">Update</button>
        {state && state.message}
      </form>
    </Box>
  );
};

export default CategoryForm;
