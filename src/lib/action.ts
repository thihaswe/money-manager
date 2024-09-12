"use server";
import { Console } from "console";
import { prisma } from "./prisma";

export const removeCategory = async (categoryId: number) => {
  try {
    const res = await prisma.category.delete({ where: { id: categoryId } });
  } catch (err) {}
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
    return { message: err.message };
  }
};
