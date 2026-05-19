This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Here is the complete blueprint of your stack, along with every single command you need for local development, database management, and deployment.

---

### Tech Stack Breakdown: What We Are Using

Your application is a modern full-stack web application. Instead of separating everything into three different projects, Next.js allows us to keep the frontend and backend unified in a single codebase.

| Layer | Technology | What it Handles |
| --- | --- | --- |
| **Frontend** | **React & Next.js (Client)** | Renders the UI, handles state (like expanding/collapsing accordion tabs), and manages user interaction. |
|  | **Tailwind CSS** | Handles all your styling using utility classes and decoupled global classes via the `@apply` directive. |
| **Backend** | **Next.js (Server)** | Handles Server Components, Server Actions (the secure `isAdmin` functions that talk to the database), and API routes. Runs on a cloud **Node.js** runtime. |
|  | **NextAuth.js** | Handles secure user registration, admin login, and session tracking. |
| **Database** | **Prisma ORM** | Act as the translator between your JavaScript/TypeScript code and your SQL database. |
|  | **Neon PostgreSQL** | A serverless, cloud-hosted relational database that stores your FAQs, Products, and Users safely. |

---

### Every Command You Need (The Master List)

#### 1. Local Development & Setup

Run these commands when working on your computer to install packages and run the project locally.

* `npm install` — Installs all the dependencies listed in your `package.json` file (run this if you clone the repo onto a new machine).
* `npm run dev` — Spins up the local development server at `http://localhost:3000` so you can test features instantly as you code.
* `npm run build` — Compiles your TypeScript, styles, and components into an optimized production build (Vercel runs this automatically when you deploy).

#### 2. Git & GitHub Operations

Use these to save your work locally and push your updates up to your GitHub repository.

* `git status` — Shows you which files have been modified or are currently untracked.
* `git add .` — Stages **all** your local file changes, prepping them to be saved.
* `git commit -m "your message here"` — Takes a permanent snapshot of your staged files with a descriptive tracking note.
* `git checkout -b main` — Safely creates and switches your context over to a clean local branch named `main`.
* `git remote add origin <github-url>` — Links your local project folder to your empty online GitHub repository (only needs to be run once).
* `git push -u origin main` — Pushes your local commits up to GitHub and sets your default tracking branch.

#### 3. Prisma & Database Operations

Run these whenever you alter your database structures, models, or need to feed raw data to Neon.

* `npx prisma db push` — Synchronizes your `prisma/schema.prisma` layout directly with your live database (Neon) without creating migration history files. Great for rapid prototyping.
* `npx prisma migrate dev --name init` — Creates a formal, recorded migration file and updates your local database layout.
* `npx prisma generate` — Re-generates the Prisma Client types. Run this whenever you add a new model to your schema so your code editor gives you auto-complete suggestions.
* `npx prisma studio` — Launches a clean, visual spreadsheet dashboard at `localhost:5555` to view, edit, and delete rows in your database without writing SQL statements.
* `node prisma/seed.js` — Runs your custom JavaScript seed script to quickly populate mock products or initial setup values straight to your active database.

---

### Complete Deployment Checklist

When you are ready to make changes live to your customers, follow this simple sequence:

1. Make your code adjustments locally $\rightarrow$ Run `git add .`, `git commit`, and `git push`.
2. **Vercel** will see the new push on GitHub and automatically build and deploy the updated frontend and backend functions.
3. If you modified your `schema.prisma` file, point your local `.env` connection string to Neon and run `npx prisma db push` to keep your cloud database structure perfectly in sync!
