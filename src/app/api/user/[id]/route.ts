export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = {
    id: params.id,
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
