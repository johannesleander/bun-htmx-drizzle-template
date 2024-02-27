import { Hono } from "hono";
import Home from "./components/home";
import TodoItem from "./components/todo-item";
import { db } from "./db/db";
import { eq, sql } from "drizzle-orm/sql";
import { todos } from "./db/schema";
import { parse } from "hono/utils/cookie";

const app = new Hono();

app.get("/", async (c) => {
    return c.html(<Home />);
});

app.get("/api/todos", async (c) => {
    const results = await db.select().from(todos);

    return c.html(
        <>
            {results.map((todo) => (
                <TodoItem {...todo} />
            ))}
        </>
    );
});
app.post("/api/todo", async (c) => {
    const { content } = await c.req.json<{ content: string }>();

    if (!content || typeof content !== "string") {
        return c.body("Content is required and must be a string", 400);
    }

    const results = await db.insert(todos).values({ content }).returning();
    if (!results || results.length < 1) {
        return c.html(<></>);
    }

    return c.html(<TodoItem {...results[0]} />);
});
app.delete("/api/todo", async (c) => {
    const { todoId } = await c.req.json<{ todoId: number }>();

    await db.delete(todos).where(eq(todos.id, todoId));

    return c.body("✔", 200, {
        "HX-Trigger": "todo-delete",
    });
});

export default app;
