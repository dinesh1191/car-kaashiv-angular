Project Architecture Overview

 Overview

This project follows a feature-based, scalable Angular architecture with clear separation between public, authentication, and authenticated application areas.
The design focuses on clean routing, layout isolation, and long-term maintainability.

 Tech Stack

Angular (Standalone + Lazy Loading)

Angular Router

Route Guards (Auth, Role-based)

HTTP Interceptors (JWT, error handling)

TypeScript

Modular CSS

  High-Level Architecture

The application is structured around business features, not pages.

src/
├── app/
│   ├── core/        → App-wide singletons (guards, interceptors, services)
│   ├── features/    → Business domains (auth, employee, user)
│   ├── shared/      → Reusable UI components & layouts
│   ├── pages/       → Public static pages (landing, contact, privacy)
│   ├── models/      → Shared domain models
│   └── app.routes.ts
├── assets/
└── environments/

  Layout Strategy

The application uses layout components as wrappers, not as route identities.

  AuthLayout (Public Auth Pages)

Used for:

Login

User Registration

Employee Registration

Includes

Header

Footer
Excludes

Sidebar

Logout

Action buttons

UX behavior:

Entire view is fixed to viewport

No unnecessary scrolling

Form content centered

2 AppLayout (Authenticated Users)

Used after successful login.

Includes

Header

Footer

Sidebar

Logout & operational buttons

Scrolling is allowed as dashboards grow.

  Routing Philosophy

Path = Feature / Intent
Layout = Internal UI concern

Layouts are not exposed in URLs.

Example Routes
/login
/register-user
/register-employee
/employee/emp-dashboard


This ensures:

Clean URLs

Layout refactors don’t break navigation

Better long-term scalability

Authentication & Authorization

authGuard protects authenticated routes

roleGuard restricts role-specific features

Guards are applied at route level, not component level

Unauthorized access redirects to /unauthorized

  Feature-Based Organization

Each feature owns:

Its components

Its services

Its routes (lazy loaded)

Example:

features/
├── employee/
│   ├── emp-dashboard
│   ├── manage-employee
│   ├── parts
│   └── services


This avoids cross-feature coupling and simplifies scaling.

  Reusability (shared/)

Layout components

Global loader

Unauthorized component

Server status banner

Shared components contain no business logic.

  Design Goals

Clean separation of concerns

Scalable routing & layouts

Easy onboarding for new developers

Minimal refactoring as features grow

  Future Enhancements

Role-based landing pages after login

Token refresh handling

Centralized error UX strategy

Architectural docs expansion under /docs