import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
import type { ServiceAccount } from 'firebase-admin';

dotenv.config();

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY!
) as ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

import adminRoutes from './routes/admin';
import eventsRoutes from './routes/events';
import signupRoutes from './routes/signup';

app.use('/api/admin', adminRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/signup', signupRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.send('API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
