import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('API is running');
});

app.get('/events', async (_req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany({
      include: {
        createdBy: true,
        signups: true,
      },
      orderBy: { datetime: 'asc' },
    });
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
});

app.post('/events', async (req: Request, res: Response) => {
  const { title, description, location, datetime, staffEmail } = req.body;

  try {
    const staff = await prisma.user.findUnique({ where: { email: staffEmail } });

    if (!staff || staff.role !== 'STAFF') {
      return res.status(403).json({ message: 'Only staff can create events.' });
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        location,
        datetime: new Date(datetime),
        createdById: staff.id,
      },
    });

    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create event.' });
  }
});

// Sign up a user for an event
app.post('/signup', async (req: Request, res: Response) => {
  const { eventId, userEmail } = req.body;
  try {
    // Find or create attendee
    let user = await prisma.user.findUnique({ where: { email: userEmail } });
    if (!user) {
      user = await prisma.user.create({
        data: { email: userEmail, role: 'ATTENDEE' },
      });
    }
    // Create signup
    const signup = await prisma.signup.create({
      data: { userId: user.id, eventId },
    });
    res.status(201).json({ message: 'Signed up!', signup });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Signup failed.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
