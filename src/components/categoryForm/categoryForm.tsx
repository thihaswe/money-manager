"use client";
import { updateCategory } from "@/lib/action";
import { Input } from "@mui/material";
import { useFormState } from "react-dom";

interface Prop {
  category: any;
}

const CategoryForm = ({ category }: Prop) => {
  const updateCategoryById = updateCategory.bind(null, category.id);
  const [state, action] = useFormState(updateCategoryById, undefined);
  console.log("form state is", state);

  return (
    <form action={action}>
      <Input defaultValue={category.name} name="categoryName" />
      <button type="submit">Update</button>
      {state && state.message}
    </form>
  );
};

export default CategoryForm;
