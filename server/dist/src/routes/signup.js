"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// server/src/routes/signup.ts
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
// POST sign up a user for an event
// server/src/routes/signup.ts
router.post('/', async (req, res) => {
    const { eventId, userEmail, userName } = req.body;
    try {
        let user = await prisma.user.findUnique({ where: { email: userEmail } });
        if (!user) {
            user = await prisma.user.create({
                data: { email: userEmail, name: userName, role: 'ATTENDEE' },
            });
        }
        else if (!user.name && userName) {
            // update existing user with name if missing
            user = await prisma.user.update({
                where: { email: userEmail },
                data: { name: userName },
            });
        }
        const signup = await prisma.signup.create({
            data: { userId: user.id, eventId },
        });
        res.status(201).json({ message: 'Signed up!', signup });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Signup failed.' });
    }
});
exports.default = router;
