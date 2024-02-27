import type { Config } from "drizzle-kit";

export default {
    schema: "./src/db/schema.ts",
    out: "./src/db/generated",
    verbose: true,
    driver: "expo",
} satisfies Config;
