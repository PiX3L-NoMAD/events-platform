"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const dotenv_1 = __importDefault(require("dotenv"));
const eventify_auth_d7118_firebase_adminsdk_fbsvc_fea411ca4f_json_1 = __importDefault(require("../eventify-auth-d7118-firebase-adminsdk-fbsvc-fea411ca4f.json"));
dotenv_1.default.config();
const serviceAccount = eventify_auth_d7118_firebase_adminsdk_fbsvc_fea411ca4f_json_1.default;
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount)
});
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const admin_1 = __importDefault(require("./routes/admin"));
const events_1 = __importDefault(require("./routes/events"));
const signup_1 = __importDefault(require("./routes/signup"));
app.use('/api/admin', admin_1.default);
app.use('/api/events', events_1.default);
app.use('/api/signup', signup_1.default);
app.get('/', (_req, res) => {
    res.send('API is running');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
