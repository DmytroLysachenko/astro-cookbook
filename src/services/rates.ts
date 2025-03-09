import type { rates } from "@/db/schema/rates";
import type { InferInsertModel } from "drizzle-orm";

export type TRecipe = InferInsertModel<typeof rates>;
