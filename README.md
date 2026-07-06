# Annotation Activity Console

An internal console for annotators' tasks (image/audio/text): status, assignee, live updates over WebSocket, and a streamed AI summary rendered as sanitized markdown.

## Running it

Two servers are needed: the mock backend and the Next.js app.

**1. Mock server** (REST + WebSocket + streaming endpoint, runs on `http://localhost:4000`):

```bash
cd mock-server
npm install
npm run mock
```

**2. App** (in a separate terminal, from the repo root):

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tests

```bash
npm test
```

Runs the Jest/RTL suite: the normalizer, `selectFilteredTasks`, a filtering interaction test, and an XSS-safety test for the streamed markdown renderer.

## Environment

The app reads the mock server's base URL from env vars (see `.env.local`):
- `NEXT_PUBLIC_API_BASE_URL` — REST base, e.g. `http://localhost:4000/api`
- `NEXT_PUBLIC_WS_URL` — WebSocket URL, e.g. `ws://localhost:4000/ws`

## Notes for reviewers

See [`DECISIONS.md`](./DECISIONS.md) for the full writeup: normalization strategy, state/architecture tradeoffs, how the streamed markdown is sanitized (and where), the IndexedDB caching approach, the bug-hunt fixes in `src/buggy/TaskTicker.tsx`, and what was deliberately left out given the time budget.
