import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import * as schema from "./schema";
import { todos } from "./schema";

export const sqlite = new Database("main.db");
export const db = drizzle(sqlite, { schema });
