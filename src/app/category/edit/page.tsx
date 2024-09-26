import RemoveCategroy from "@/components/buttons_and_icons/removeCategory";
import AddNewCategory from "@/components/categoryForm/addNewCategory";
import { fetchCategory } from "@/lib/data";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Divider, Typography } from "@mui/material";
import { Category } from "@prisma/client";
import Link from "next/link";

const EditCategoryPage = async ({
  searchParams,
}: {
  searchParams: { type: string; pastPath: string };
}) => {
  const type = searchParams.type;
  const path = searchParams.pastPath;
  const categories: Category[] = await fetchCategory(type);

  // logic to write db inside components
  // const categories: Category[] = await prisma.category.findMany({
  //   where: {
  //     title: type === "income" ? TitleName.income : TitleName.expense,
  //   },
  // });

  const cat = [
    { id: 1, name: "a" },
    { id: 2, name: "b" },
    { id: 3, name: "c" },
    { id: 4, name: "d" },
    { id: 5, name: "d" },
    { id: 6, name: "d" },
    { id: 7, name: "d" },
    { id: 8, name: "d" },
    { id: 9, name: "d" },
  ];

  return (
    <Box sx={{ position: "relative" }}>
      <Link href={`/${path}?open=true&type=${type}`}>
        <ArrowBackIcon sx={{ fontSize: 65, marginLeft: 3 }} />
      </Link>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingX: 5,
          justifyContent: "center",
        }}
      >
        {cat.map((c) => {
          return (
            <Box key={c.id} sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { lg: "space-around", xs: "space-between" },
                  marginY: 3,
                  alignItems: "center",
                }}
              >
                <RemoveCategroy id={c.id} />
                <Typography sx={{ fontSize: 35 }}>{c.name}</Typography>
                <Link
                  href={`/category/edit/${c.id}?open=true&type=${type}&pastPath=${path}`}
                >
                  <EditIcon sx={{ fontSize: 35 }} />
                </Link>
              </Box>
              <Divider sx={{ border: "1px solid black" }}></Divider>
            </Box>
          );
        })}
      </Box>
      <Box>
        <AddNewCategory />
      </Box>
    </Box>
  );
};

export default EditCategoryPage;
