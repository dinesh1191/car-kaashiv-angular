**CarKaashiv 2.0**

CarKaashivAngular is a feature-based Angular application designed with clean routing, layout separation, and scalable architecture in mind.
The project emphasizes enterprise-style structure, maintainability, and clear separation of concerns.

This project was generated using Angular CLI v19.2.18.

 **Architecture Overview**

The application follows a feature-first architecture instead of page-based routing.

Key Architectural Decisions

Feature-based folder structure (employee, user, auth)

Dedicated layouts for authenticated and unauthenticated users

Clean URLs based on feature / intent, not layout names

Centralized guards and interceptors

Lazy-loaded feature routes for scalability

 **Layout Strategy**
 
Auth Layout

Used for:

Login

User registration

Employee registration

**Includes:**

Header

Footer

Excludes:

Sidebar

Logout

Operational actions

**UX behavior:**

Fixed viewport (no unnecessary scrolling)

Centered form content

App Layout (Authenticated Users)

Used after successful login.

**Includes:**

Header

Footer

Sidebar

Logout and role-based actions

Supports scrolling as dashboard content grows.

**Routing Philosophy**

Path = Feature / Intent
Layout = Internal UI concern

Layouts are not exposed in URLs.

Example Routes
/login
/register-user
/register-employee
/employee/emp-dashboard


This ensures:

Clean and readable URLs

Layout changes don’t affect navigation

Long-term scalability

** Authentication & Authorization**

Route-level authentication using authGuard

Role-based access control using roleGuard

Guards applied at routing level, not component level

Unauthorized access redirected to /unauthorized

 **Project Structure (Simplified)**
src/
├── app/
│   ├── core/        # guards, interceptors, global services
│   ├── features/    # auth, employee, user domains
│   ├── shared/      # reusable components and layouts
│   ├── pages/       # public pages (landing, contact, privacy)
│   ├── models/      # shared domain models
│   └── app.routes.ts
├── assets/
└── environments/

 **Development Server**

To start a local development server:

ng serve


Open your browser at:

http://localhost:4200/


The application automatically reloads on source file changes.

 **Code Scaffolding**

Generate a new component:

ng generate component component-name


List all available schematics:

ng generate --help

 **Build**

To build the project:

ng build


Build artifacts will be stored in the dist/ directory.
Production builds are optimized for performance and speed.

 **Testing**
Unit Tests
ng test


Runs unit tests using Karma.

End-to-End Tests
ng e2e


Angular CLI does not include an e2e framework by default. You may integrate one as needed.

 **Design Goals**

Clean separation of concerns

Scalable feature-based routing

Maintainable layout strategy

Resume-ready enterprise architecture

 **Future Enhancements**

Role-based landing pages after login

Token refresh & session handling

Centralized error UX strategy

Extended architecture documentation

**Additional Resources**

Angular CLI Documentation
