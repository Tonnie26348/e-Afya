# E-Afya Final Setup Guide

To complete the setup and run the **E-Afya Kenya Digital Health Ecosystem** prototype, follow these steps:

## 1. Database Setup (Supabase)

You must run the provided SQL scripts in your Supabase project's **SQL Editor**:

1.  **Run Schema:** Copy the contents of `server/db/schema.sql` and run it in the SQL Editor to create the tables.
2.  **Run Seed Data:** Copy the contents of `server/db/seed_data.sql` and run it to populate the system with sample hospitals, patients, and inventory.

## 2. Environment Variables

Ensure your `.env` files are correctly set up (I have already created these with the credentials you provided):

-   **Server (`server/.env`):**
    ```
    SUPABASE_URL=...
    SUPABASE_KEY=...
    PORT=5000
    ```
-   **Client (`client/.env`):**
    ```
    VITE_API_URL=http://localhost:5000/api
    ```

## 3. Start the Application

Open two terminal windows:

### Terminal 1: Backend
```bash
cd server
npm install
npm run dev # This starts the server at http://localhost:5000
```

### Terminal 2: Frontend
```bash
cd client
npm install
npm run dev # This starts the UI at http://localhost:5173
```

## 4. Features Implemented

-   **NHDE (Module 1):** View and register patients with Digital Health IDs.
-   **Smart Referral (Module 2):** Monitor hospital bed capacity and initiate digital referrals.
-   **Drug Supply (Module 4):** Track medicine inventory and update stock levels.
-   **CHW Integration (Module 5):** View real-time field reports from Community Health Workers.
-   **National Analytics (Module 3):** Interactive dashboard with disease trends and vaccination coverage.

---
**E-Afya: Connecting Kenya for a healthier future.**
