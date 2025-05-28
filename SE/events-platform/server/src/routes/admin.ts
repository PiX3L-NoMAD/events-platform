import { Router } from 'express';
import admin from 'firebase-admin';

const router = Router();

router.post('/assign-role', async (req, res) => {
    // Middleware to verify admin privileges
    const secret = req.headers['admin-secret'] as string | undefined;

    // Check if the secret is provided and matches the environment variable
    if (!secret || secret !== process.env.ADMIN_SECRET) {
        return res.status(401).json({ error: 'Unauthorized: bad admin secret' });
    }
    
    const { uid, role } = req.body;
    if (!['staff', 'user'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }
    try {
        await admin.auth().setCustomUserClaims(uid, { role });
        const updatedUser = await admin.auth().getUser(uid);
        console.log('✅ Updated custom claims:', updatedUser.customClaims);      
      return res.json({ success: true });
    } catch (err: any) {
        console.error('Error setting role:', err);
      return res.status(500).json({ error: err.message || 'Failed to set role' });
    }
  });
  
  export default router;