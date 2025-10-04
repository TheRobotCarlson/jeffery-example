import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router';
import type { ReactNode } from 'react';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start with OpenAI',
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f5f5f5;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
          }
          nav {
            background: #fff;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 2rem;
          }
          nav ul {
            list-style: none;
            display: flex;
            gap: 2rem;
            padding: 1rem 2rem;
          }
          nav a {
            text-decoration: none;
            color: #0066cc;
            font-weight: 500;
          }
          nav a:hover {
            color: #0052a3;
          }
          .card {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 2rem;
          }
          h1 {
            color: #1a1a1a;
            margin-bottom: 1rem;
          }
          h2 {
            color: #333;
            margin-bottom: 0.5rem;
          }
          button {
            background: #0066cc;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 4px;
            font-size: 1rem;
            cursor: pointer;
            font-weight: 500;
          }
          button:hover:not(:disabled) {
            background: #0052a3;
          }
          button:disabled {
            background: #ccc;
            cursor: not-allowed;
          }
          textarea {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-family: inherit;
            font-size: 1rem;
            margin-bottom: 1rem;
            resize: vertical;
          }
          .result {
            background: #f9f9f9;
            padding: 1rem;
            border-radius: 4px;
            border-left: 4px solid #0066cc;
            margin-top: 1rem;
            white-space: pre-wrap;
          }
          .error {
            background: #fee;
            border-left-color: #c00;
            color: #c00;
          }
          .loading {
            color: #666;
            font-style: italic;
          }
        `}</style>
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
