import { User } from "@prisma/client";
interface LogInUser {
  id: string;
  name: string;
  image: string;
  email: string;
}

export interface UserInitialState {
  user: LogInUser | undefined;
  isLoading: boolean;
  error: Error | null;
}

declare module "next-auth" {
  interface User {
    avatar?: string;
    l;
  }
}
