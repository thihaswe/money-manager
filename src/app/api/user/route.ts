import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const { email, username, password } = data;

    if (!email || !username || !password) {
      return new Response(JSON.stringify({ message: "Invalid inputs" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    const newUser = await prisma.user.create({
      data: {
        email,
        name: username,
        password,
      },
    });
    return new Response(JSON.stringify(newUser), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {}
}

export async function PUT(request: Request) {
  return new Response(JSON.stringify({ name: "john" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function DELETE(request: Request) {
  const data = {
    name: "John Doe",
    age: 30,
  };
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
