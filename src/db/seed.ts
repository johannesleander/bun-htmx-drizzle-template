import { db } from "./db";
import * as schema from "./schema";

console.log(`Seeding database...`);
await db.insert(schema.todos).values([
    {
        content: "First post",
    },
    {
        content: "Second post",
    },
    {
        content: "Third post",
    },
]);

console.log(`Seeding complete.`);
