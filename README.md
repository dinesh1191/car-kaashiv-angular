# CarKaashiv 2.0 – Frontend

CarKaashiv 2.0 is a modern Angular 19 application built using the Standalone Architecture approach. The application provides a complete spare parts ordering and order fulfillment experience for customers and administrators through a scalable, feature-driven architecture.

The project emphasizes maintainability, responsive design, reusable UI components, and production-oriented frontend development practices.

Generated using Angular CLI v19.x.

---

## Architecture Overview

The application follows a feature-first architecture with clear separation between business domains, shared UI components, layouts, and core infrastructure.

### Key Architectural Decisions

* Angular 19 Standalone Architecture
* Feature-based folder organization
* Lazy-loaded feature routes
* Route Guards for authentication and authorization
* HTTP Interceptors for API communication
* Shared reusable UI component library
* Responsive mobile-first design
* Separation of layouts from business features

### Core Principles

* Scalability
* Maintainability
* Reusability
* Clear separation of concerns
* Enterprise-style project organization

---

## Application Modules

### Authentication

Features include:

* User Registration
* Login
* Session Validation
* Protected Routes
* Unauthorized Access Handling

### Parts Management

Administrative capabilities:

* View Parts
* Create Parts
* Edit Parts
* Delete Parts
* Part Image Management
* Fallback Image Handling

### Customer Ordering

Customer workflow:

```text
Browse Parts
      ↓
Add To Cart
      ↓
Checkout
      ↓
Enter Delivery Details
      ↓
Place Order
      ↓
Invoice Generation
      ↓
Payment Proof Submission
```

Features:

* Shopping Cart
* Quantity Management
* Delivery Address Validation
* Invoice Display
* QR Payment Workflow
* Payment Screenshot Upload
* Order Confirmation Journey

### Order Management

Administrative workflows:

```text
Submitted
      ↓
Verified
      ↓
Ready For Dispatch
      ↓
Shipped
```

Features include:

* Payment Verification Queue
* Dispatch Management
* Shipment Status Updates
* Order Lifecycle Tracking

---

## Layout Strategy

### Auth Layout

Used for:

* Login
* Registration
* Public Authentication Screens

Includes:

* Header
* Footer

Excludes:

* Sidebar
* Administrative Actions
* Authenticated Navigation

UX Characteristics:

* Centered forms
* Clean authentication experience
* Mobile-friendly layout

---

### App Layout

Used for authenticated users.

Includes:

* Header
* Sidebar Navigation
* Footer
* User Session Controls

Supports:

* Administrative dashboards
* Order management screens
* Parts management workflows
* Responsive content areas

---

## Routing Philosophy

```text
Path = Business Intent
Layout = Internal UI Concern
```

Layouts are never exposed through URLs.

### Example Routes

```text
/login
/register
/parts
/cart
/checkout
/orders
/admin/orders/submitted
/admin/orders/dispatch
/admin/orders/shipped
```

Benefits:

* Clean URLs
* Layout independence
* Easier maintenance
* Scalable route organization

---

## Authentication & Authorization

### Route Protection

* authGuard protects authenticated routes
* role-based authorization support
* Unauthorized users redirected appropriately
* Session-aware navigation

### API Security Integration

* JWT-based authentication
* Secure API communication
* Automatic authorization handling via interceptors

---

## Shared UI Components

Reusable component library includes:

* Confirm Dialog
* Empty State Component
* Loading Indicators
* Snackbar Notifications
* Shared Form Components
* Responsive Layout Components

Benefits:

* Consistent UX
* Reduced duplication
* Faster feature development

---

## Error Handling & UX

### Global Error Handling

Centralized handling for:

* API failures
* Network issues
* Unauthorized access
* Validation errors

### User Experience Improvements

* Friendly validation messages
* Empty-state experiences
* Loading feedback
* Graceful image fallbacks
* Confirmation dialogs for destructive actions

---

## Project Structure

```text
src/
├── app/
│   ├── core/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── services/
│   │
│   ├── features/
│   │   ├── auth/
│   │   ├── parts/
│   │   ├── cart/
│   │   ├── orders/
│   │   └── admin/
│   │
│   ├── shared/
│   │   ├── components/
│   │   ├── directives/
│   │   └── layouts/
│   │
│   ├── models/
│   └── app.routes.ts
│
├── assets/
└── environments/
```

---

## Responsive Design

The application is built using a mobile-first approach.

Supports:

* Mobile Phones
* Tablets
* Desktop Devices

Responsive techniques include:

* Bootstrap Grid System
* Angular Material Components
* Flexible Layout Containers
* Adaptive Navigation

---

## Development Server

Start a local development server:

```bash
ng serve
```

Application URL:

```text
http://localhost:4200
```

Hot reload is enabled during development.

---

## Build

Generate a production build:

```bash
ng build
```

Artifacts are generated inside:

```text
dist/
```

Production builds include:

* Optimization
* Tree Shaking
* Minification
* Lazy Loading Support

---

## Testing

### Manual Regression Testing

Key business flows tested:

* Authentication
* Parts Management
* Cart Workflow
* Order Placement
* Payment Submission
* Payment Verification
* Dispatch Processing
* Shipment Tracking

### Unit Testing

```bash
ng test
```

---

## Deployment

Frontend deployment pipeline:

* GitHub Repository
* GitHub Actions CI/CD
* Netlify Hosting

Features:

* Automated deployments
* Preview builds
* Production build validation

---

## Design Goals

* Enterprise-grade architecture
* Production-ready workflows
* Reusable UI patterns
* Mobile-first experience
* Scalable feature organization
* Real-world business process modeling

---

## Future Enhancements

* Customer Order History
* Order Tracking Timeline
* Advanced Search & Filtering
* Dashboard Analytics
* Inventory Alerts
* Enhanced Reporting
* Progressive Web App (PWA) Support

---

## Notes

* Built using Angular 19 Standalone Architecture
* Designed to work with ASP.NET Core Backend API
* Optimized for future expansion into mobile clients
* Business workflows modeled around real spare-parts ordering processes

---

## Author

Dinesh Varadhan

Full Stack Developer (.NET + Angular)
