# jeffery-example

A React TanStack Start application with file-based routing and OpenAI integration for server-side rendering and LLM content generation.

## Features

- 🚀 **TanStack Start** - Modern full-stack React framework with SSR
- 🗂️ **File-based Routing** - Automatic route generation from file structure
- 🤖 **OpenAI Integration** - Server-side API functions for LLM content generation
- ⚡ **Vite & Vinxi** - Lightning-fast development and build tooling
- 🎨 **Type-safe** - Full TypeScript support

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/TheRobotCarlson/jeffery-example.git
cd jeffery-example
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Edit `.env` and add your OpenAI API key:
```
OPENAI_API_KEY=your-actual-api-key-here
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build

Build for production:

```bash
npm run build
```

### Production

Start the production server:

```bash
npm run start
```

## Project Structure

```
jeffery-example/
├── app/
│   ├── routes/
│   │   ├── __root.tsx      # Root layout component
│   │   ├── index.tsx       # Home page with OpenAI integration
│   │   └── about.tsx       # About page with SSR
│   ├── client.tsx          # Client entry point
│   ├── server.tsx          # Server entry point
│   ├── router.tsx          # Router configuration
│   └── routeTree.gen.ts    # Auto-generated route tree
├── public/                  # Static assets
├── app.config.ts           # Vinxi configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

## How It Works

### File-based Routing

Routes are automatically generated from files in the `app/routes/` directory:
- `__root.tsx` - Root layout component for all pages
- `index.tsx` - Home page at `/`
- `about.tsx` - About page at `/about`

### Server Functions

Server functions allow you to run code on the server and call it from the client:

```typescript
const generateContent = createServerFn({ method: 'POST' })
  .validator((data: { prompt: string }) => data)
  .handler(async ({ data }) => {
    // This code runs on the server
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    // ... OpenAI API call
  });
```

### OpenAI Integration

The home page demonstrates OpenAI integration with a content generator that:
1. Takes user input as a prompt
2. Sends it to a server function
3. Calls OpenAI's GPT-3.5 Turbo API on the server
4. Returns the generated content to the client

## License

MIT