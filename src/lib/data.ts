import { TitleName } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "./prisma";

export async function fetchCategoryByType(type: string, userId: number) {
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

export async function fetchCategoryByUserId(userId: number) {
  noStore();
  try {
    return await prisma.category.findMany({ where: { userId } });
  } catch (error) {}
}

export async function fetchNoteByUserId(userId: number) {
  noStore();
  try {
    return await prisma.note.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {}
}
