import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "./prisma";
import { TitleName } from "@prisma/client";
import {
  IconCategory,
  IconCategoryName,
  IconsToShow,
  IconTypes,
} from "@/type/iconType";

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

export const funcIcons = (icons: IconTypes[]): IconsToShow[] => {
  const iconsCategory = [];

  icons.map(
    (icon: IconTypes) =>
      !iconsCategory.includes(icon.iconCategory) &&
      iconsCategory.push(icon.iconCategory)
  );

  const icN: IconCategoryName[] = iconsCategory.map((icn) => ({
    id: icn,
    name: IconCategory[icn],
  }));

  const iconsToShow: IconsToShow[] = icN.map((i) => {
    return {
      iconCategoryName: i,
      icons: icons.filter((icon) => icon.iconCategory === i.id),
    };
  });
  return iconsToShow;
};
