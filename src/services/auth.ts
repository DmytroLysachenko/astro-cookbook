import { db } from "@/db";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";

interface UserData {
  name: string;
  email: string;
  bio?: string;
  lastActive?: Date;
}

export const getUser = async (email: string) => {
  const user = await db.select().from(users).where(eq(users.email, email));

  return user[0] ?? null;
};

export const createUser = async (userData: UserData) => {
  const user = await db.insert(users).values(userData);

  return user;
};

export const updateUser = async (
  email: string,
  userData: Partial<UserData>,
) => {
  const updatedUser = await db
    .update(users)
    .set(userData)
    .where(eq(users.email, email));

  return updatedUser;
};
