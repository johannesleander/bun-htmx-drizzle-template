import { pathToFileURL } from "bun";

export default function Layout({ children }: { children: JSX.Element }) {
    return (
        <html>
            <head>
                <script
                    src="https://unpkg.com/htmx.org@1.9.10"
                    integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC"
                    crossorigin="anonymous"
                ></script>
                <script src="https://unpkg.com/htmx.org/dist/ext/json-enc.js"></script>
                <link href="/styles.css" rel="stylesheet"></link>
            </head>
            <body class="bg-gray-800 text-white m-2">{children}</body>
        </html>
    );
}
