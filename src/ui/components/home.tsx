import Layout from "../layouts";
import NewTodo from "./new-todo";
import TodoList from "./todo-list";

export default function Home() {
    return (
        <Layout>
            <div class="mt-8 max-w-sm mx-auto">
                <NewTodo />
                <TodoList />
            </div>
        </Layout>
    );
}
