# Task Management Dashboard

A task management application built with Next.js 14 and TypeScript to practice development with the App Router. **[Click here to live demo.](https://task-management-dashboard-ten-navy.vercel.app/)**

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://task-management-dashboard-nyhvwu24p-eusuellenyasmin.vercel.app)

<div align="center">
  <img src="https://github.com/user-attachments/assets/550ec5a6-27c5-4c4c-aa04-15412e2ee903" alt="Appointment Rebooking Demo" width="100%"/>
</div>

## Features

- Create, edit, and delete tasks
- Filter by status, priority, and tags
- Sort by date, priority, or creation date
- Data persistence with localStorage
- Responsive interface

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Hooks + LocalStorage

## Project Structure

```
app/
├── components/
│   └── ui/              # Reusable components
├── lib/
│   ├── taskUtils.ts     # Business logic
│   └── mockData.ts      # Sample data
├── types/
│   └── task.ts          # TypeScript definitions
└── page.tsx             # Main page
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## Key Learnings

- Difference between Client and Server Components in Next.js 14
- State management with React Hooks (`useState`, `useEffect`, `useMemo`)
- TypeScript for type safety
- LocalStorage synchronization with React
- Tailwind CSS for rapid UI development

## Technical Challenges

- **SSR + LocalStorage:** Using `useEffect` to prevent hydration errors
- **Performance:** Implementing `useMemo` to optimize re-renders
- **Type Safety:** Proper TypeScript typing for props and state

---

**Yasmin Suellen** [GitHub](https://github.com/yasminsuellen) · [LinkedIn](https://www.linkedin.com/in/yasminsuellen/)
