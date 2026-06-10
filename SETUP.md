# CarKaashiv 2.0 Frontend Setup Guide

## Project Overview

CarKaashiv 2.0 frontend is built using:

- Angular 19 (Standalone Architecture)
- Angular Material
- TypeScript
- RxJS
- JWT Authentication
- Responsive Mobile-First UI

---

# System Requirements

## Required Software

| Software | Version |
|---|---|
| Node.js | 22.12.0 |
| npm | 10.9.0 |
| Angular CLI | 19.2.19 |
| Git | Latest Stable |

---

# Angular Package Versions

| Package | Version |
|---|---|
| Angular Core | 19.2.15 |
| Angular CLI | 19.2.19 |
| Angular Material | 19.2.19 |
| RxJS | 7.8.2 |
| TypeScript | 5.7.3 |
| Zone.js | 0.15.1 |

---

# Clone Project

```bash
git clone <repo-url>
```

Example:

```bash
git clone https://github.com/dinesh1191/carkaashiv-frontend.git
```

---

# Navigate to Project

```bash
cd carkaashiv-frontend
```

---

# Install Dependencies

```bash
npm install
```

---

# Run Application

```bash
ng serve
```

Application will run at:

```txt
http://localhost:4200
```

---

# Environment Configuration

Verify environment files exist:

```txt
src/environments/environment.ts
src/environments/environment.staging.ts
src/environments/environment.prod.ts
```

Example API configuration:

```ts
export const environment = {
  production: false,
  apiBaseUrl: 'https://localhost:7143/api'
};
```

---

# Backend Requirement

Frontend requires backend API running locally.

Example backend URL:

```txt
https://localhost:7143/swagger
```

Ensure:
- Backend is running
- CORS is configured
- HTTPS certificate trusted

---

# Useful Commands

## Check Angular Version

```bash
ng version
```

---

## Start Application on Different Port

```bash
ng serve --port 4300
```

---

## Reinstall Dependencies

Windows:

```powershell
rd /s /q node_modules
del package-lock.json
npm install
```

Linux/Mac:

```bash
rm -rf node_modules
rm package-lock.json
npm install
```

---

# Common Issues

## PowerShell Script Execution Error

Run PowerShell as Administrator:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

---

## HTTPS Certificate Error

Run:

```bash
dotnet dev-certs https --trust
```

---

## Port Already In Use

Change Angular port:

```bash
ng serve --port 4300
```

---

# Git Workflow

## Check Current Branch

```bash
git branch
```

---

## Pull Latest Changes

```bash
git pull origin main
```

---

## Check Working Tree

```bash
git status
```

---

# Recommended VS Code Extensions

- Angular Language Service
- ESLint
- Prettier
- GitLens
- Material Icon Theme

---

# Project Structure (High Level)

```txt
src/
 ├── app/
 ├── core/
 ├── shared/
 ├── features/
 ├── layouts/
 ├── services/
 ├── guards/
 ├── interceptors/
 └── environments/
```

---

# Authentication Notes

Project uses:
- JWT Authentication
- Route Guards
- Session Storage
- HTTP Interceptors

---

# Deployment Notes

Frontend deployment targets:
- Netlify
- Docker
- CI/CD Pipeline Ready

---

# Important Notes

- Do not commit `node_modules`
- Do not commit sensitive environment secrets
- Always verify backend API before frontend testing
- Keep Node and Angular versions aligned across machines

---

# Maintainer Notes

CarKaashiv 2.0 is developed using a sprint-based modular architecture approach with focus on:

- Scalability
- Maintainability
- Mobile-first UX
- Enterprise-grade API integration
- Production deployment readiness