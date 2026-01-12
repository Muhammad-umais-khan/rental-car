# Car Rental Admin Dashboard

A modern admin dashboard for managing a car rental fleet, built with Next.js 16 App Router, Tailwind CSS, and Supabase.

## Features

- 🚗 Full CRUD operations for car inventory
- 📊 Dashboard with live statistics from database
- 🔐 Password-protected authentication
- 📱 Mobile-responsive design
- 🔍 Search and sortable tables
- 🎨 Clean, consistent UI components

---

## Things I Learned (Day 8 Internship Reflection)

### Architectural Decisions

Honestly, the Server vs Client Component distinction confused me at first. But once it clicked, it made a lot of sense. I kept most pages as Server Components by default—the dashboard stats, car listings, detail pages—because they don't need JavaScript on the client and load faster that way. Better for SEO too, apparently.

The tricky part was the sortable table. Sorting requires `useState` and user interaction, so that *had* to be a Client Component. My solution was to keep the page itself as a Server Component that fetches the data, then pass it down to a `SortableTable` client component. Best of both worlds. The data fetching happens on the server, the interactive bits happen on the client. Took me a while to figure out that pattern but it's pretty elegant once you see it.

### Professional Workflow

One thing I'll definitely do differently next time: plan the folder structure *before* writing any code. I started coding right away and had to reorganize things midway through. Annoying.

What worked well was keeping components separated by purpose—`/components/ui` for reusable stuff like buttons and inputs, `/components/layout` for the shell, sidebar, header. When I needed to add the mobile menu later, I knew exactly where everything lived. Would've been a nightmare otherwise.

Also learned to keep the `lib/` folder for business logic separate from components. The Supabase integration went smoothly because of this.

### AI Automation

Look, I'll be honest—I used AI to skip the boring parts. Here's what I mean:

**Mock Data Generation:** Writing 8 realistic car entries with makes, models, years, license plates, daily rates? That's 20 minutes of tedious work I didn't have to do. AI generated the JSON array in seconds, and I just tweaked a few values to make sense.

**Boilerplate Components:** The Input, Button, Select, Card components are all basically the same pattern—props for variants, some Tailwind classes, forward the rest. I described the design system once and let AI scaffold them out. I still reviewed everything and made adjustments, but starting from zero every time would've been painful.

**CSS Debugging:** The sidebar layout gave me issues. Stuff like getting the mobile overlay to work, the transform transitions, the z-index stacking. Instead of googling for 30 minutes, I just described what was broken and got working Tailwind classes back. Saved me a headache.

Is this cheating? I don't think so. I still had to understand what the code does, debug when things broke, and make judgment calls on the architecture. The AI just handled the parts that don't require creativity.

### Ownership

I tried to treat this like a real client project, not just a toy demo. That meant:

- Actually handling edge cases (empty states, loading states, form validation)
- Writing meaningful commit messages instead of "fix stuff"
- Making the UI consistent across all pages
- Adding features the brief didn't ask for (search, mobile support, real database) because a real product would need them

Could I have done the bare minimum? Sure. But then I wouldn't have learned as much, and honestly the dashboard wouldn't feel *finished*. There's something satisfying about a project that actually works end-to-end.

---

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
