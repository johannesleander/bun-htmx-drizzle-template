import { Hono } from "hono";
import Home from "./components/home";
import TodoItem from "./components/todo-item";
import { db } from "./db/db";
import { eq, sql } from "drizzle-orm/sql";
import { todos } from "./db/schema";

const app = new Hono();

app.get("/", async (c) => {
    const res = await db.get(sql`select 'hello sqlite' as text`);
    return c.html(<Home />);
});

app.post("/api/todo", async (c) => {
    const { content } = await c.req.json();

    const results = await db.insert(todos).values({ content }).returning();
    if (!results || results.length < 1) {
        return c.html(<></>);
    }

    return c.html(<TodoItem {...results[0]} />);
});
app.get("/api/todos", async (c) => {
    const results = await db.select();
    console.log(results);
    return c.html(<></>);

    return c.html(
        <>
            {results.map((todo) => (
                <TodoItem {...todo} />
            ))}
        </>
    );
});
app.delete("/api/todo", async (c) => {
    const { todoId } = await c.req.json();

    await db.delete(todos).where(eq(todos.id, todoId));

    return c.body("✔", 200, {
        "HX-Trigger": "todo-delete",
    });
});

export default app;
