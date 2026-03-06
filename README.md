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

<img width="398" height="876" alt="Captura de pantalla 2026-03-06 192356" src="https://github.com/user-attachments/assets/dd00cd0f-11ee-4a68-9cfa-a873807e28fa" />
<img width="397" height="877" alt="Captura de pantalla 2026-03-06 192502" src="https://github.com/user-attachments/assets/c089315d-d596-4917-83b8-770b8a3193fa" />
<img width="412" height="875" alt="Captura de pantalla 2026-03-06 193919" src="https://github.com/user-attachments/assets/86eeaf31-535f-4823-b93a-e1e43cd19e6d" />
<img width="1679" height="878" alt="Captura de pantalla 2026-03-06 193856" src="https://github.com/user-attachments/assets/7a7fc58b-a37d-44f2-a1e0-97ba02474336" />
<img width="1662" height="876" alt="Captura de pantalla 2026-03-06 193758" src="https://github.com/user-attachments/assets/4f365f76-4dd7-47c3-b516-16990d013024" />
<img width="397" height="881" alt="Captura de pantalla 2026-03-06 193838" src="https://github.com/user-attachments/assets/5362e80e-cc75-4f97-8056-b191d02be8f7" />
<img width="1679" height="880" alt="Captura de pantalla 2026-03-06 193704" src="https://github.com/user-attachments/assets/bb389873-ced6-479d-baa1-7e58da02b144" />
<img width="396" height="875" alt="Captura de pantalla 2026-03-06 193730" src="https://github.com/user-attachments/assets/9211f3bb-73d5-4291-82bd-0a87a4315df5" />
<img width="960" height="880" alt="Captura de pantalla 2026-03-06 193512" src="https://github.com/user-attachments/assets/a723ac10-65b1-4454-9336-e1717fc218e0" />
<img width="397" height="877" alt="Captura de pantalla 2026-03-06 193550" src="https://github.com/user-attachments/assets/dcb7adb7-d1e8-46ee-ad85-096e55ba97f5" />
<img width="1662" height="876" alt="Captura de pantalla 2026-03-06 193006" src="https://github.com/user-attachments/assets/bdef6710-1d5f-4ece-aef7-7a372e5bc0e2" />
<img width="1663" height="871" alt="Captura de pantalla 2026-03-06 193202" src="https://github.com/user-attachments/assets/3ef7ee9a-c7c4-40c7-9813-b8c5a25028b2" />
<img width="1676" height="878" alt="Captura de pantalla 2026-03-06 192842" src="https://github.com/user-attachments/assets/3487ba59-6004-4b7b-8256-ad18a8bf0d05" />
<img width="413" height="879" alt="Captura de pantalla 2026-03-06 192908" src="https://github.com/user-attachments/assets/fec93c12-a72f-44cb-bac2-0b239556ba2b" />
<img width="1676" height="877" alt="Captura de pantalla 2026-03-06 192712" src="https://github.com/user-attachments/assets/16da10a6-5740-450c-a076-255f9594c6ff" />
<img width="396" height="875" alt="Captura de pantalla 2026-03-06 192746" src="https://github.com/user-attachments/assets/3b1d617a-15ac-476e-b28a-0a8fba6a4db3" />
<img width="411" height="876" alt="Captura de pantalla 2026-03-06 192536" src="https://github.com/user-attachments/assets/f35dfe17-f19a-445b-95ea-5dab00fdfcca" />
<img width="1661" height="877" alt="Captura de pantalla 2026-03-06 192636" src="https://github.com/user-attachments/assets/0630a101-0b01-41b1-ae05-cf51e108a437" />


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
