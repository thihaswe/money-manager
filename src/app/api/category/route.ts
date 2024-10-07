import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request, context) {
  const isAuth = await auth();

  const url = new URL(request.url);
  const userId = Number(url.searchParams.get("userId"));

  try {
    const categories = await prisma.category.findMany({ where: { userId } });
    return Response.json(categories);
  } catch (error) {
    return Response.json(error.message, {
      status: 404,
    });
  }
}
