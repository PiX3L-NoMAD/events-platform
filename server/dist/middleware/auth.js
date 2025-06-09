"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = verifyToken;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
async function verifyToken(req, res, next) {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Missing token' });
    }
    const token = header.split(' ')[1];
    try {
        const decoded = await firebase_admin_1.default.auth().verifyIdToken(token);
        req.user = {
            ...decoded,
        };
        next();
    }
    catch {
        res.status(401).json({ error: 'Invalid token' });
    }
}
