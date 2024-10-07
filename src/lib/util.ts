import { Icons } from "@/components/buttons_and_icons/icons";
import {
  IconCategory,
  IconCategoryName,
  IconsToShow,
  IconTypes,
} from "@/type/iconType";

const iconsTsx: IconTypes[] = Icons;
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

export const oneIcon = (iconId: number): IconTypes => {
  return iconsTsx.find((icon) => icon.id === iconId);
};
