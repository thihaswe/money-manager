import CategoryForm from "@/components/categoryForm/categoryForm";
import { fetchCategoryById } from "@/lib/data";
import { Box, Typography } from "@mui/material";
import { headers } from "next/headers";

interface Prop {
  params: { id: number };
  searchParams;
}

const CategoryEdit = async (prop: Prop) => {
  // to get the pathname
  // const headerList = headers();
  // const pathname = headerList.get("x-current-path");

  const categoryId: number = Number(prop.params.id);
  const category = await fetchCategoryById(categoryId);

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <CategoryForm category={category} />
    </Box>
  );
};

export default CategoryEdit;
