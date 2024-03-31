import { Todo } from "@db/schema";

export default function TodoItem({ id, content, timestamp }: Todo) {
  return (
    <li key={id} class="py-3 sm:py-4">
      <div class="flex items-center">
        <div class="ms-4 min-w-0 flex-1">
          <p class="truncate text-sm font-medium text-gray-900 dark:text-white">
            {content}
          </p>
          <p class="truncate text-sm text-gray-500 dark:text-gray-400">
            {timestamp}
          </p>
        </div>
        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          <button
            name="todoId"
            value={id}
            hx-delete="/api/todo"
            hx-swap="delete"
            hx-ext="json-enc"
            hx-trigger="click"
          >
            ❌
          </button>
        </div>
      </div>
    </li>
  );
}
