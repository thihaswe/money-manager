import { Category } from "@prisma/client";

export interface CategoryInitialState {
  categories: Category[];
  error: Error | null;
  isLoading: boolean;
}
