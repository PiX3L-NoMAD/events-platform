"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const router = (0, express_1.Router)();
router.post('/assign-role', async (req, res) => {
    // Middleware to verify admin privileges
    const secret = req.headers['admin-secret'];
    // Check if the secret is provided and matches the environment variable
    if (!secret || secret !== process.env.ADMIN_SECRET) {
        return res.status(401).json({ error: 'Unauthorized: bad admin secret' });
    }
    const { uid, role } = req.body;
    if (!['staff', 'user'].includes(role)) {
        return res.status(400).json({ error: 'Invalid role' });
    }
    try {
        await firebase_admin_1.default.auth().setCustomUserClaims(uid, { role });
        const updatedUser = await firebase_admin_1.default.auth().getUser(uid);
        console.log('✅ Updated custom claims:', updatedUser.customClaims);
        return res.json({ success: true });
    }
    catch (err) {
        console.error('Error setting role:', err);
        return res.status(500).json({ error: err.message || 'Failed to set role' });
    }
});
exports.default = router;
