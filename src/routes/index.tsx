import { createFileRoute, Link } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { useState } from 'react';

// Server function to generate content using Vercel AI SDK
const generateContent = createServerFn({ method: 'POST' })
  .inputValidator((data: { prompt: string }) => data)
  .handler(async ({ data }) => {
    const { openai } = await import('@ai-sdk/openai');
    const { generateText } = await import('ai');
    
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not set in environment variables');
    }

    try {
      const { text, usage } = await generateText({
        model: openai('gpt-3.5-turbo', { apiKey }),
        prompt: data.prompt,
        maxTokens: 500,
      });

      return {
        success: true,
        content: text || 'No response generated',
        usage: {
          promptTokens: usage.promptTokens,
          completionTokens: usage.completionTokens,
          totalTokens: usage.totalTokens,
        },
      };
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error(`Failed to generate content: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    try {
      const response = await generateContent({ data: { prompt } });
      setResult(response.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

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
          <h1>OpenAI Content Generator</h1>
          <p style={{ marginBottom: '1.5rem', color: '#666' }}>
            Enter a prompt below to generate content using OpenAI's GPT-3.5 Turbo model.
            This demonstrates server-side rendering with TanStack Start and Vercel AI SDK integration.
          </p>
          
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here... (e.g., 'Write a haiku about programming')"
            rows={4}
          />
          
          <button onClick={handleGenerate} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Content'}
          </button>

          {loading && (
            <div className="result loading">
              Generating content with OpenAI...
            </div>
          )}

          {error && (
            <div className="result error">
              Error: {error}
            </div>
          )}

          {result && !loading && (
            <div className="result">
              <strong>Generated Content:</strong>
              <br />
              <br />
              {result}
            </div>
          )}
        </div>

        <div className="card">
          <h2>About This Example</h2>
          <p>
            This is a TanStack Start application demonstrating:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li>File-based routing with TanStack Router</li>
            <li>Server-side rendering (SSR)</li>
            <li>Server functions for API calls</li>
            <li>Vercel AI SDK integration for LLM content generation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
