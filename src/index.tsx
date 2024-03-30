import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import Home from "@ui/components/home";
import TodoItem from "@ui/components/todo-item";
import { db } from "@db/db";
import { eq } from "drizzle-orm/sql";
import { Todo, todos } from "@db/schema";

const app = new Hono();

app.get("/", async (c) => {
    return c.html(<Home />);
});

app.get(
    "/styles/tailwind.generated.css",
    serveStatic({ path: "src/ui/styles/tailwind.generated.css" })
);

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
    const { content } = await c.req.json<Pick<Todo, "content">>();

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
