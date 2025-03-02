import { db } from "@/db";
import { users } from "@/db/schema/users";
import { eq, type InferInsertModel } from "drizzle-orm";

type TCreateUserData = InferInsertModel<typeof users>;
type TUpdateUserData = Partial<TCreateUserData>;

export const getUser = async (email: string) => {
  try {
    const user = await db.select().from(users).where(eq(users.email, email));

    return user[0] ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createUser = async (userData: TCreateUserData) => {
  try {
    const user = await db.insert(users).values(userData);

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateUser = async (email: string, userData: TUpdateUserData) => {
  try {
    const updatedUser = await db
      .update(users)
      .set(userData)
      .where(eq(users.email, email));

    return updatedUser;
  } catch (error) {
    console.error(error);
    return null;
  }
};
