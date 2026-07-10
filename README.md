# CarKaashiv 2.0 Frontend

> Modern Angular 19 e-commerce frontend for the CarKaashiv 2.0 platform.

CarKaashiv 2.0 is a full-stack automotive spare parts e-commerce application built using **Angular 19** and **ASP.NET Core Web API**. The frontend follows a scalable feature-first architecture with clean routing, reusable UI components, secure authentication, and role-based dashboards for customers and employees.

---

# Tech Stack

- Angular 19
- TypeScript
- Bootstrap 5
- Angular Material
- RxJS
- HttpClient
- ASP.NET Core REST API
- Cookie-based Authentication (HttpOnly)
- Git & GitHub

---

# Key Features

## Customer

- User Registration
- Secure Login
- Product Browsing
- Category Filtering
- Shopping Cart
- Checkout
- Address Management
- Order History
- Payment Screenshot Upload
- Responsive Mobile-first UI

## Employee

- Employee Login
- Payment Verification Queue
- Order Processing
- Ready for Dispatch Queue
- Shipped Orders
- Order Details
- Inventory-aware Workflow

---

# Architecture

The application follows a **feature-first architecture** designed for scalability and long-term maintainability.

```
src/
 ├── app/
 │   ├── core/
 │   │    ├── guards/
 │   │    ├── interceptors/
 │   │    └── services/
 │   │
 │   ├── features/
 │   │    ├── auth/
 │   │    ├── employee/
 │   │    ├── user/
 │   │    ├── cart/
 │   │    ├── checkout/
 │   │    └── products/
 │   │
 │   ├── shared/
 │   │    ├── components/
 │   │    ├── layouts/
 │   │    ├── directives/
 │   │    └── pipes/
 │   │
 │   ├── models/
 │   ├── pages/
 │   └── app.routes.ts
 │
 ├── assets/
 └── environments/
```

---

# Application Layouts

## Authentication Layout

Used for:

- Login
- Customer Registration
- Employee Registration

Features

- Header
- Footer
- Centered Forms
- Fixed Viewport
- No Sidebar

---

## Application Layout

Used after successful authentication.

Features

- Header
- Footer
- Sidebar
- Role-aware Navigation
- Logout
- Responsive Dashboard
- Scrollable Content Area

---

# Routing Philosophy

URLs represent **business intent**, not UI layouts.

Examples

```
/login
/register-user
/register-employee
/products
/cart
/checkout
/orders
/employee/dashboard
/employee/payment-review
```

Benefits

- Clean URLs
- Decoupled layouts
- Easy future expansion
- Better maintainability

---

# Authentication

Authentication is implemented using secure **HttpOnly Cookie-based sessions**.

Features

- Cookie Authentication
- Route Guards
- Role Guards
- Automatic Session Validation
- Unauthorized Redirects
- Protected Employee Routes

---

# Security

- HttpOnly Authentication Cookies
- Route Protection
- Role-based Authorization
- HTTP Interceptors
- Secure API Communication

---

# Responsive Design

Designed with a mobile-first approach.

Supports

- Mobile
- Tablet
- Desktop

Several modules use dedicated mobile layouts for improved usability.

---

# Development

Install dependencies

```bash
npm install
```

Run locally

```bash
ng serve
```

Navigate to

```
http://localhost:4200
```

---

# Build

Development build

```bash
ng build
```

Production build

```bash
ng build --configuration production
```

---

# Testing

Unit Tests

```bash
ng test
```

---

# Design Principles

- Feature-first Architecture
- Separation of Concerns
- Lazy-loaded Modules
- Reusable Components
- Enterprise-style Folder Structure
- Scalable Routing
- Responsive UI
- Clean Code Practices

---

# Future Improvements

- Progressive Web App (PWA)
- Signal-based State Management
- Dashboard Analytics
- Real-time Notifications
- Wishlist
- Product Reviews
- Advanced Search
- Order Tracking Timeline

---

# Backend

This frontend communicates with the CarKaashiv ASP.NET Core REST API for authentication, product management, order processing, inventory, and employee operations.

---
# Author

**Dinesh V**

Full Stack Developer (.NET + Angular)

- LinkedIn: https://linkedin.com/in/dineshvaradhan
