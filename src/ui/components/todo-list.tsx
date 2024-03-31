export default function TodoList() {
    return (
      <div class="max-w-m mt-8 w-full dark:text-white">
        <h1>My Todos</h1>
        <div class="mt-2 rounded-lg border border-gray-200 bg-white p-4 shadow sm:p-8 dark:border-gray-700 dark:bg-gray-800">
          <div class="flow-root">
            <ul
              hx-get="/api/todos"
              hx-trigger="load, todo-delete from:body"
              id="todo-list"
              role="list"
              class="divide-y divide-gray-200 dark:divide-gray-700"
            ></ul>
          </div>
        </div>
      </div>
    );
}