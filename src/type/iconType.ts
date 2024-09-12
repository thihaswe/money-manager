import { ReactNode } from "react";

// Define the IconTypes interface and IconCategory enum
export interface IconTypes {
  id: number;
  iconCategory: IconCategory;
  iconFile: ReactNode;
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
}
