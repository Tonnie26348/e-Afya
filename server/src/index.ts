import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { supabase } from './config/db';

import patientRoutes from './routes/patientRoutes';
import hospitalRoutes from './routes/hospitalRoutes';
import drugRoutes from './routes/drugRoutes';
import reportRoutes from './routes/reportRoutes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/patients', patientRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/inventory', drugRoutes);
app.use('/api/reports', reportRoutes);

// Health Check
app.get('/', (req: Request, res: Response) => {
  res.send('E-Afya Health Connect API is running');
});

// Basic route to test DB connection
app.get('/api/test-db', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('users').select('*').limit(1);
    if (error) throw error;
    res.json({ success: true, message: 'Database connected successfully', data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Database connection failed', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
