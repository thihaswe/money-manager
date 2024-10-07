import OneIconToShow from "@/components/buttons_and_icons/oneIcontToShow";
import RemoveCategroy from "@/components/buttons_and_icons/removeCategory";
import AddNewCategory from "@/components/categoryForm/addNewCategory";
import { auth } from "@/lib/auth";
import { fetchCategory } from "@/lib/data";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Divider, Typography } from "@mui/material";
import { Category } from "@prisma/client";
import { headers } from "next/headers";
import Link from "next/link";

const EditCategoryPage = async ({
  searchParams,
}: {
  searchParams: { type: string; pastPath: string };
}) => {
  const type = searchParams.type;
  const path = searchParams.pastPath;
  const headerList = headers();
  const pathname = headerList.get("x-current-path");
  const searchParamsString = new URLSearchParams(searchParams);
  const pathToRevalidate = `${pathname}?${searchParamsString.toString()}`;

  const { user } = await auth();

  const categories: Category[] = await fetchCategory(type, Number(user.id));

  // logic to write db inside components
  // const categories: Category[] = await prisma.category.findMany({
  //   where: {
  //     title: type === "income" ? TitleName.income : TitleName.expense,
  //   },
  // });

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
        <Typography variant="h3" sx={{ margin: "0 auto" }}>
          {searchParams.type === "expense" ? "Expense" : "Income"}
        </Typography>
        {categories.map((c) => {
          return (
            <Box key={c.id} sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { lg: "space-around", xs: "space-between" },
                  marginY: 3,
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <RemoveCategroy
                    id={c.id}
                    pathToRevalidate={pathToRevalidate}
                  />
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <OneIconToShow iconId={c.iconId} size={35} />
                  <Typography sx={{ fontSize: 25 }}>{c.name}</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Link
                    href={`/category/edit/${c.id}?open=true&type=${type}&pastPath=${path}`}
                  >
                    <EditIcon sx={{ fontSize: 35 }} />
                  </Link>
                </Box>
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
