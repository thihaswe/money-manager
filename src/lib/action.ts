"use server";
import { TitleName } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { auth, signIn } from "./auth";
import { prisma } from "./prisma";

export const addCategory = async (prevState, formData: FormData) => {
  const {
    categoryName,
    selected: iconId,
    type,
    currentPath,
  } = Object.fromEntries(formData);
  try {
    const { user } = await auth();
    const userId = Number(user.id);
    const data = await prisma.category.create({
      data: {
        userId: Number(userId),
        iconId: Number(iconId),
        name: categoryName as string,
        title: type === "expense" ? TitleName.expense : TitleName.income,
      },
    });
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
  pathToRevalidate: string,
  prevState: any,
  data: FormData
) => {
  const newCategoryName = data.get("categoryName") as string;
  const isAuth = await auth();

  try {
    if (!isAuth) throw new Error("not authenticated");
    const res = await prisma.category.update({
      where: { id: categoryId },
      data: {
        name: newCategoryName,
      },
    });
    // throw new Error("some error");
    revalidatePath(pathToRevalidate);
    return { success: "category Updated" };
  } catch (err) {
    console.error(err.meta.cause);
    if (err.message.includes("Invalid `prisma.category.update()` invocation")) {
      return { error: "Record to update not found." };
    }
  }
};

export const removeCategory = async (
  categoryId: number,
  pathToRevalidate: string
) => {
  try {
    const res = await prisma.category.delete({ where: { id: categoryId } });
    revalidatePath(pathToRevalidate);
    return { success: "category deleted" };
  } catch (err) {
    console.log(err);
    return err.message;
  }
};

export const addNewUser = async (prevState, formData: FormData) => {
  const newUser = Object.fromEntries(formData);

  try {
    const respone = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    const data = await respone.json();

    if (data.email) {
      return { success: "created new user" };
    } else if (data.message === "Invalid inputs") {
      return { error: "plz fill all the fields" };
    }
  } catch (err) {
    console.log(err);
    return { error: "something went wrong" };
  }
};

export const logInCredentials = async (prevState, formData: FormData) => {
  const { email, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", {
      email,
      password,
      // Prevent automatic redirect
    });

    return { success: "logged in" };
  } catch (err) {
    console.error("Frontend error:", err.message);
    if (err.message.includes("Invalid credentials")) {
      return { error: "Invalid credentials" };
    } else if (err.message.includes("NEXT_REDIRECT")) {
      return { success: "logged in" };
    }
    return { error: "Something went wrong" };
  }
};

export const handleGoogleSignIn = async (formData: FormData) => {
  await signIn("google", { redirectTo: "/record" });
};

export const addnewNote = async (prevState, formData: FormData) => {
  const { pathname, amount, categoryId } = Object.fromEntries(formData);
  // const castedCategory = category as unknown as Category;

  try {
    const { user } = await auth();
    const userId = Number(user.id);
    const response = await prisma.note.create({
      data: {
        userId: Number(userId),
        categoryId: Number(categoryId),
        amount: Number(amount),
      },
    });

    revalidatePath(pathname.toString());
    return { success: "true" };
  } catch (err) {
    console.log(err);
    if (err.message.includes("NEXT_REDIRECT")) {
      revalidatePath(pathname.toString());
      return { success: "true" };
    }
    return { error: err.message };
  }
};
