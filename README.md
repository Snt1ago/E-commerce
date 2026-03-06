<div align="center">
<img width="1200" height="475" alt="E-commerce Banner" src="/public/logo.svg" />
</div>

# Modern E-commerce Platform

A full-stack e-commerce application built with Next.js, featuring an admin dashboard, secure authentication, and a dynamic shopping experience.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Installation Steps](#installation-steps)
  - [Run Locally](#run-locally)
- [Process](#process)
  - [Architecture & State](#architecture--state)
  - [Core Modules](#core-modules)
  - [Built with](#built-with)
    - [Applied Skills](#applied-skills)
    - [Tools Used](#tools-used)
- [Useful resources](#useful-resources)
- [Author](#author)

## Demo

<video src="/public/demo.mp4" width="100%" controls></video>

## Features

- **Product Catalog:** Browse products with advanced filtering by brand and category.
- **Admin Dashboard:** Full CRUD functionality for product management and inventory control.
- **Shopping Cart:** Real-time cart updates managed with Zustand.
- **Secure Authentication:** User and Admin roles implemented via NextAuth.js.
- **Responsive Design:** Optimized for mobile, tablet, and desktop using Tailwind CSS.
- **Persisted Data:** Database management with Prisma and SQLite.

## Installation Steps

### Run Locally

**Prerequisites:** Node.js, npm/pnpm/yarn

1. **Install dependencies:**
   `npm install`
2. **Setup Database:**
   `npx prisma migrate dev`
   `npm run seed`
3. **Run the app:**
   `npm run dev`

## Process

### Architecture & State

The application uses **Next.js App Router** for structured navigation and SEO. **Zustand** handles the client-side state for the shopping cart and user preferences, ensuring a seamless and fast UI experience without constant server roundtrips for minor state changes.

### Core Modules

1.  **Admin Panel:** Protected routes for managing products, including image uploads and price updates.
2.  **Catalog & Search:** Dynamic product display with real-time search filtering.
3.  **Auth System:** Multi-role authentication (Admin/User) to restrict access to sensitive operations.

### Built with

#### Applied Skills

- **Full-Stack Development:** Integrating frontend UI with backend Server Actions and Database.
- **State Management:** Efficient global state handling with Zustand.
- **Database Design:** Modeling relationships and schemas with Prisma ORM.
- **Secure Development:** Implementing authentication and authorization patterns.
- **UI/UX Design:** Creating a premium, responsive shopping interface.

#### Tools Used

- **Frameworks:** Next.js 16, React 19
- **Database:** Prisma, SQLite
- **State & Auth:** Zustand, NextAuth.js
- **Styles:** Tailwind CSS, Lucide React (Icons)
- **Language:** TypeScript
- **Deployment:** Vercel (Planned)
- **AI:** Google Antigravity (Powered)

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
</div>

## Useful resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma ORM](https://www.prisma.io/)
- [Zustand State Management](https://github.com/pmndrs/zustand)
- [NextAuth.js](https://next-auth.js.org/)

## Author

Made with ❤️ by Snt1ago
