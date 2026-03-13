# E-Afya Health Connect - National Digital Health Ecosystem

This is a full-stack digital health platform designed for Kenya, integrating hospitals, pharmacies, and community health workers.

## Project Structure

- **client/**: Frontend application (React, Vite, Tailwind CSS, Shadcn UI).
- **server/**: Backend API (Node.js, Express, TypeScript, Supabase).

## Prerequisites

- Node.js (v18+)
- Supabase Account (for Database & Auth)

## Setup Instructions

### 1. Database Setup (Supabase)

1.  Create a new project on [Supabase](https://supabase.com).
2.  Go to the **SQL Editor** in your Supabase dashboard.
3.  Copy the content of `server/db/schema.sql` and run it to create the database tables.
4.  Go to **Project Settings > API** and copy your `Project URL` and `anon public` key.

### 2. Backend Setup

1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `server` directory:
    ```env
    PORT=5000
    SUPABASE_URL=your_supabase_project_url
    SUPABASE_KEY=your_supabase_anon_key
    ```
4.  Start the server:
    ```bash
    npm run dev
    ```

### 3. Frontend Setup

1.  Navigate to the client directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env.local` file in the `client` directory:
    ```env
    VITE_API_URL=http://localhost:5000/api
    ```
4.  Start the frontend:
    ```bash
    npm run dev
    ```

## Features Implemented

- **Module 1: National Health Data Exchange (NHDE)**
    - Secure patient record sharing (FHIR compliant schema).
    - API: `/api/patients`
- **Module 2: Smart Referral & Hospital Capacity**
    - Real-time hospital bed/ICU tracking.
    - API: `/api/hospitals`
- **Module 4: National Drug Supply Monitor**
    - Drug inventory tracking and redistribution.
    - API: `/api/inventory`
- **Module 5: Community Health Integration**
    - CHW reporting interface.
    - API: `/api/reports/chw`

## Architecture

- **Frontend:** React + TypeScript + Tailwind CSS
- **Backend:** Node.js + Express + TypeScript
- **Database:** PostgreSQL (Supabase)
