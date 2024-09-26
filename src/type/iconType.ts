import React, { ReactElement, ReactNode } from "react";

// Define the IconTypes interface and IconCategory enum
export interface IconTypes {
  id: number;
  iconCategory: IconCategory;
  iconFile: ReactNode | ReactElement;
}

export enum IconCategory {
  entertainment,
  food,
  shopping,
  lifestyle,
  personal,
  education,
  sport,
  office,
  health,
  finance,
  others,
  foreach,
}

export interface IconsToShow {
  iconCategoryName: IconCategoryName;
  icons: IconTypes[];
}
export interface IconCategoryName {
  id: number;
  name: string;
}
