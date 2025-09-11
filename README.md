# 👑 Maharani

A full-featured **E-commerce platform** built with **Next.js**, **TailwindCSS**, and **shadcn/ui**, featuring a robust **Admin Dashboard**, payment integrations with **Stripe** and **PayPal**, and modern UI enhancements with **react-icons**. This project delivers a scalable, performant, and visually appealing shopping experience.

**Live Demo**: *Coming Soon* (add your live deployment link here)  
**GitHub Repo**: [SonuR12/Maharani](https://github.com/SonuR12/Maharani)

---

##  Features

-  **Admin Dashboard** – Intuitive dashboard for managing products, orders, and users.
-  **Secure Payments** – Integrated with **Stripe** and **PayPal** for seamless and secure checkout.
-  **User Authentication** – Login and register flow to secure customer accounts.
-  **Order Management** – Customers can view past orders, statuses, and details.
-  **Modern Design** – Built with **shadcn/ui** and enhanced using **react-icons** for iconography.
-  **Responsive Layout** – Fully optimized for mobile, tablet, and desktop.
-  **Fast & Efficient** – Powered by Next.js and TailwindCSS for excellent performance.

---

##  Folder Structure

```bash
Maharani/
├── public/                      # Static assets (images, icons, etc.)
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Landing / Home page
│   │   ├── auth/                # User authentication (login/register)
│   │   ├── cart/                # Shopping Cart
│   │   ├── checkout/            # Checkout & payment integration
│   │   ├── products/            # Product listing and details
│   │   └── admin/               # Admin Dashboard module
│   │       ├── layout.tsx       # Admin layout (sidebar, header)
│   │       ├── products/        # Manage products
│   │       ├── orders/          # Manage orders
│   │       └── users/           # Manage users
│   │
│   ├── components/              # Reusable UI components
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── icons/               # Shared React Icons
│   │   ├── layout/              # Navbar, Footer, Sidebar
│   │   └── forms/               # Form components (inputs, buttons)
│   │
│   ├── lib/                     # Utility functions / API calls
│   ├── hooks/                   # Custom React hooks
│   ├── styles/                  # Tailwind config and global styles
│   └── config/                  # Config for Stripe, PayPal, env settings
│
├── prisma/                      # Prisma schema, migrations (if using Prisma)
├── .env                         # Environment variables (Stripe, PayPal, DB)
├── .gitignore
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md

```
---

## 📸 Screenshot

![Apple Clone Screenshot](https://github.com/SonuR12/Maharani/blob/main/public/maharani.png)


---

##  .env.local

```bash
# App Info
NEXT_PUBLIC_APP_NAME=Maharaniz
NEXT_PUBLIC_APP_DESCRIPTION=An Ecommerce website for female
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Database
MONGODB_URI=

# Authentication (NextAuth)
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

# Email (Resend)
RESEND_API_KEY=
SENDER_EMAIL=

# File Upload (UploadThing)
UPLOADTHING_TOKEN=

# PayPal
PAYPAL_API_URL=
PAYPAL_CLIENT_ID=
PAYPAL_APP_SECRET=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

```

