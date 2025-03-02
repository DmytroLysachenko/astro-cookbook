import { db } from "@/db";
import { users } from "@/db/schema/users";
import { eq, type InferInsertModel } from "drizzle-orm";

type TCreateUserData = InferInsertModel<typeof users>;
type TUpdateUserData = Partial<TCreateUserData>;

export const getUser = async (email: string) => {
  const user = await db.select().from(users).where(eq(users.email, email));

  return user[0] ?? null;
};

export const createUser = async (userData: TCreateUserData) => {
  const user = await db.insert(users).values(userData);

  return user;
};

export const updateUser = async (email: string, userData: TUpdateUserData) => {
  const updatedUser = await db
    .update(users)
    .set(userData)
    .where(eq(users.email, email));

  return updatedUser;
};
