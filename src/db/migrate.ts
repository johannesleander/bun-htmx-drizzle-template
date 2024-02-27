import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { db, sqlite } from "./db";

await migrate(db, { migrationsFolder: "./src/db/generated" });
await sqlite.close();
