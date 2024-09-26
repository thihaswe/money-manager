"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";

export const addCategory = async (prevState, formData: FormData) => {
  const {
    categoryName,
    selected: iconId,
    type,
    currentPath,
  } = Object.fromEntries(formData);
  try {
    console.log("hello from addCategorys", categoryName, iconId, currentPath);
    revalidatePath(currentPath.toString());
    return { success: "true" };
  } catch (err) {
    if (err.message.includes("NEXT_REDIRECT")) {
      revalidatePath(currentPath.toString());
      return { success: "true" };
    }
    return { error: err.message };
  }
};

export const updateCategory = async (
  categoryId: number,
  prevState: any,
  data: FormData
) => {
  const newCategoryName = data.get("categoryName") as string;
  try {
    const res = await prisma.category.update({
      where: { id: categoryId },
      data: {
        name: newCategoryName,
      },
    });
    // throw new Error("some error");
    return { message: "done" };
  } catch (err) {
    console.error(err.meta.cause);
    if (err.message.includes("Invalid `prisma.category.update()` invocation")) {
      return { message: "Record to update not found." };
    }
  }
};

export const removeCategory = async (categoryId: number) => {
  try {
    const res = await prisma.category.delete({ where: { id: categoryId } });
  } catch (err) {
    console.log(err);
    return err.message;
  }
};
