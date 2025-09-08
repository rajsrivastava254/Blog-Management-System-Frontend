# Vivid Blog Flow – Frontend

A modern blog management frontend built with Vite + React + TypeScript + shadcn/ui + Tailwind. It supports login, signup (backed by your Spring Boot API), post creation, search, and a simple profile greeting.

## Quick start (local)

Requirements: Node 18+, npm (or bun/pnpm), a running backend API (Spring Boot) on `https://blog-management-system-qk02.onrender.com`.

```bash
npm install
npm run dev
```

Open `http://localhost:5173` (or the printed port).

## Environment variables

Create a `.env` file in the project root if you want to change the backend URL:

```
VITE_API_URL=https://blog-management-system-qk02.onrender.com
```

The code defaults to `https://blog-management-system-qk02.onrender.com` when `VITE_API_URL` is not set.

## Features

- Email/password login and signup
- Auto‑login after successful signup
- Persistent session via `localStorage`
- Create posts and list all posts from backend
- Search posts (title/content/tags)
- Simple profile section (first/last name) stored locally
- Toast notifications for success/error

## Backend expectations

Your Spring Boot backend should expose at least:

- `POST /users` → create user `{ email, password }` (returns 201, 409 on duplicate)
- `GET /users` → list users (used for login validation)
- `GET /posts` → list posts
- `POST /posts` → create post

Recommended backend notes:

- Keep a unique index on `users.email`
- Normalize emails to lowercase
- Return 409 for duplicate email, 201 for successful creation

## Deploying to Vercel

1. Push this repo to GitHub.
2. In Vercel, import the GitHub repo.
3. Set build settings:
   - Framework: “Vite” (or “Other”) – Vercel will detect it
   - Build command: `npm run build`
   - Output directory: `dist`
4. Environment variables (Project Settings → Environment Variables):
   - `VITE_API_URL` → your backend URL (for example, `https://your-backend.example.com`)
5. Deploy.

If your backend is not publicly accessible, you can:
- Host it on a public server (Render, Railway, Fly.io, etc.)
- Or add a Vercel Serverless function proxy (not included here) to forward API requests.

## Scripts

```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint ."
}
```

## Tech stack

- React 18 + TypeScript
- Vite
- Tailwind CSS + shadcn/ui (Radix primitives)
- React Router
- @tanstack/react-query (provider wired; can be used for data fetching)

## Development notes

- Login and signup currently validate against `/users`. For production, implement a secure auth flow (hash passwords, sessions/tokens) and switch the frontend to use dedicated auth endpoints.
- Posts are fetched from `/posts` on login; adjust the URL with `VITE_API_URL` if needed.
- Profile fields (first/last name) are stored in `localStorage` for the greeting.

## Troubleshooting

- Getting 409 on signup: your backend is signaling duplicate email. Ensure the table has a unique index on `email` and the service normalizes/trims the email.
- Getting 500 on `/users`: check for JSON recursion on entities, or return DTOs; verify DB columns exist (e.g., `created_at`).
- CORS errors: enable CORS on the backend (allow the Vercel domain and localhost during dev).

## License

MIT
