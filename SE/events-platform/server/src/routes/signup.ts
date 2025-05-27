// server/src/routes/signup.ts
import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

// POST sign up a user for an event
router.post('/', async (req: Request, res: Response) => {
  const { eventId, userEmail } = req.body;
  try {
    let user = await prisma.user.findUnique({ where: { email: userEmail } });
    if (!user) {
      user = await prisma.user.create({
        data: { email: userEmail, role: 'ATTENDEE' },
      });
    }
    const signup = await prisma.signup.create({
      data: { userId: user.id, eventId },
    });
    res.status(201).json({ message: 'Signed up!', signup });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Signup failed.' });
  }
});

export default router;