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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Description 

### Idea

The goal of this project is to create a performant and scalable e-commerce application using Next.js with Server-Side Rendering (SSR). SSR helps improve search engine optimization (SEO) and initial page load performance, making the site more discoverable and faster for users. 

### MVP's 

#### Milestone 1

- Implement user authentication ✅
- Shopping cart (Context API) ✅
- Products listing ✅
- Single product page ✅
- Integrate payments system ✅

#### Milestone 2

- Implement Wishlist functionality ✅
- Implements reviews system

### Tech stack

- Frontend: [NextJS, Embla Carousel]
- Backend: [Sanity (CMS), NextJS, Stripe]

## Features 

- Server-Side Rendering: Ensures fast page loads and enhanced SEO.
- Shopping Cart Functionality: Persistent cart state, allowing users to add/remove items across sessions.
- User Database: Secure user authentication and account management for personalized shopping experiences.
- Wishlist System: Users can save products to their wishlist for future purchases or browsing.
- Optimized for Performance: Focus on lightweight design and quick interactions to minimize load times and maximize user satisfaction.

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

