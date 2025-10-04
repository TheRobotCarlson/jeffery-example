import { createFileRoute, Link } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';

// Server function that runs on SSR
const getAboutData = createServerFn({ method: 'GET' }).handler(async () => {
  // This runs on the server
  return {
    title: 'About TanStack Start',
    description: 'A modern full-stack React framework',
    features: [
      'File-based routing',
      'Server-side rendering (SSR)',
      'Type-safe server functions',
      'Built on Vite',
      'OpenAI integration support',
    ],
    timestamp: new Date().toISOString(),
  };
});

export const Route = createFileRoute('/about')({
  loader: async () => {
    const data = await getAboutData();
    return data;
  },
  component: About,
});

function About() {
  const data = Route.useLoaderData();

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <div className="container">
        <div className="card">
          <h1>{data.title}</h1>
          <p style={{ fontSize: '1.125rem', color: '#666', marginBottom: '1.5rem' }}>
            {data.description}
          </p>

          <h2>Key Features</h2>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
            {data.features.map((feature) => (
              <li key={feature} style={{ marginBottom: '0.5rem' }}>
                {feature}
              </li>
            ))}
          </ul>

          <p style={{ color: '#999', fontSize: '0.875rem' }}>
            Page rendered at: {new Date(data.timestamp).toLocaleString()}
          </p>
        </div>

        <div className="card">
          <h2>How It Works</h2>
          <p style={{ marginBottom: '1rem' }}>
            This page demonstrates server-side rendering (SSR) with TanStack Start.
            The data you see above was fetched on the server using a server function
            and rendered into HTML before being sent to your browser.
          </p>
          <p>
            The home page includes an interactive example of using OpenAI's API
            through a server function to generate content dynamically.
          </p>
        </div>
      </div>
    </div>
  );
}
