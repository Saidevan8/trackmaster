# TrackMaster - Personal Expense Tracker

A modern, secure, and ad-free expense tracking application built with React and TypeScript.

## 🚀 How to Deploy for Free

Since this is currently a **Frontend-Only** application (using LocalStorage for data), you can deploy it to any static site host for free.

### Option 1: Vercel (Recommended)
1. Push this code to a **GitHub** repository.
2. Go to [Vercel.com](https://vercel.com) and sign up/login.
3. Click **"Add New Project"** and select your GitHub repository.
4. Vercel will detect `Vite` automatically.
5. Click **Deploy**.

### Option 2: Netlify
1. Push this code to **GitHub**.
2. Go to [Netlify.com](https://www.netlify.com).
3. Click **"Add new site"** -> **"Import an existing project"**.
4. Connect GitHub and select your repo.
5. Click **Deploy**.

### Option 3: Manual Upload (Netlify Drop)
1. Run `npm install` on your computer.
2. Run `npm run build`. This creates a `dist` folder.
3. Drag and drop the `dist` folder onto the [Netlify Drop](https://app.netlify.com/drop) page.

## 🛠 Project Setup

- **Frontend**: React, TypeScript, Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Backend**: Currently using `LocalStorage` (Simulated).

## 🐍 Note on Python Backend
If you want to connect this to a real Python backend later:
1. Build a Flask/FastAPI/Django API.
2. Update `services/storageService.ts` to use `fetch()` instead of `localStorage`.
3. Host the Python backend on **Render** or **PythonAnywhere** (Free tiers available).
