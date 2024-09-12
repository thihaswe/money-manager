import RemoveCategroy from "@/components/buttons_and_icons/removeCategory";
import { fetchCategory } from "@/lib/data";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Divider, Input, Typography } from "@mui/material";
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
  const cat = [
    { id: 1, name: "a" },
    { id: 1, name: "b" },
    { id: 1, name: "c" },
    { id: 1, name: "d" },
  ];

  return (
    <Box>
      <Link href={`/${path}?open=true&type=${type}`}>
        <ArrowBackIcon sx={{ fontSize: 55, marginLeft: 3 }} />
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
          );
        })}
      </Box>
    </Box>
  );
};

export default EditCategoryPage;
