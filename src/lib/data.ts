import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "./prisma";
import { TitleName } from "@prisma/client";

export async function fetchCategory(type: string) {
  noStore(); // Indicate that the result should not be cached
  try {
    const data = await prisma.category.findMany({
      where: {
        title: type === "income" ? TitleName.income : TitleName.expense,
      },
    });
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch expense icons.");
  }
}

export async function fetchCategoryById(id: number) {
  noStore(); // Indicate that the result should not be cached
  try {
    const data = await prisma.category.findUnique({
      where: {
        id,
      },
    });
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch expense icons.");
  }
}
