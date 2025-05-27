import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../middleware/auth';

const prisma = new PrismaClient();
const router = Router();

// GET all events
router.get('/', async (_req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany({
      include: { createdBy: true, signups: true },
      orderBy: { datetime: 'asc' },
    });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
});

// GET event by ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const event = await prisma.event.findUnique({
      where: { id },
      include: { createdBy: true, signups: { include: { user: true } } },
    });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch event' });
  }
});

// POST create event (staff only)
router.post('/', verifyToken, async (req: Request, res: Response) => {
    if (req.user?.role !== 'staff') {
        return res.status(403).json({ message: 'Only staff can create events.' });
      }
    
    const { title, description, location, datetime } = req.body;
    const user = req.user;

  try {
    const event = await prisma.event.create({
      data: {
        title,
        description,
        location,
        datetime: new Date(datetime),
        createdById: user.uid,
      },
    });
      res.status(201);
      res.json({ message: 'Event created successfully!', event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create event.' });
  }
});

// PUT update event by ID (staff only)
router.put('/:id', verifyToken, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, location, datetime } = req.body;
    const user = req.user;
  
    if (user?.role !== 'staff') {
      return res.status(403).json({ message: 'Forbidden: staff only' });
    }
  
    try {
      const updatedEvent = await prisma.event.update({
        where: { id },
        data: {
          title,
          description,
          location,
          datetime: new Date(datetime),
        },
      });
      return res.json(updatedEvent);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to update event.' });
    }
  });
  
  // DELETE event by ID (staff only)
  router.delete('/:id', verifyToken, async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user;
  
    if (user?.role !== 'staff') {
      return res.status(403).json({ message: 'Forbidden: staff only' });
    }
  
    try {
      // Housekeeping: delete related signups first
      await prisma.signup.deleteMany({ where: { eventId: id } });
      const deletedEvent = await prisma.event.delete({ where: { id } });
      return res.json(deletedEvent);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to delete event.' });
    }
  });
  
  export default router;
