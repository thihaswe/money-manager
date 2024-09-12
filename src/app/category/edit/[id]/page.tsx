import CategoryForm from "@/components/categoryForm/categoryForm";
import { Box } from "@mui/material";
import { headers } from "next/headers";

const CategoryEdit = async ({ params }: { params: { id: number } }) => {
  // to get the pathname
  // const headerList = headers();
  // const pathname = headerList.get("x-current-path");

  const categoryId: number = Number(params.id);
  // const category = await fetchCategoryById(categoryId);

  return (
    <Box>
      <CategoryForm category={{ name: "hello", id: 1 }} />
    </Box>
  );
};

export default CategoryEdit;
