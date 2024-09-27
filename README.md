# Luxe shop

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Description 

### Idea

Idea of this project was to create lightweight and easy to use ecommerce platform.

### MVP's 
#### Milestone 1

Implement user authentication ✅

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Authentication

### Structure 

```bash
.
├── app
│   ├── auth.js             # Main auth handlers
│   ├── middleware.js       # Restrict access to user account when not logged in
│   ├── api
│   │   ├── auth
│   │   │   ├── [...nextauth]
│   │   │   │   └── route.js  # Auth route handler
│   ├── auth
│   │   ├── page.js         # Sign in page
│   │   ├── signup
│   │   │   └── page.js     # Sign up page

```

## Deployment

Frontend and a backend is deployed on vercel with PostgreSQL database to store user information.

