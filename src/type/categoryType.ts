import { Category } from "@prisma/client";

export interface CategoryInitialState {
  note: Category[];
  error: Error | null;
  isLoading: boolean;
}
