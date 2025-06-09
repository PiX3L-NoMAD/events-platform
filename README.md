# Eventify – Community Event Hub

Eventify is a full-stack web platform where community members can browse upcoming events, sign up to attend, and add them directly to their Google Calendar. Staff users can log in securely to create, edit, and manage events.

Live site: [https://example.vercel.app](https://example.vercel.app)
Render hosted address: https://events-platform-1hnt.onrender.com/ 
Video walkthrough: [YouTube link](#) *(add your video walkthrough link here)*
GitHub repo: https://github.com/PiX3L-NoMAD/events-platform


## Features

### Core Functionality

- Public event listings with title, time, location, and description
- Email-based signup for event attendance
- Google Calendar integration (post-signup)
- Staff-only authentication to create, edit, or delete events
- Responsive design with clear loading and error feedback
- Basic accessibility considerations (semantic HTML, keyboard navigation)


## Tech Stack

**Frontend**

- React with TypeScript
- Tailwind CSS
- Axios
- React Router

**Backend**

- Node.js with Express
- Prisma ORM
- PostgreSQL (or SQLite for dev/test)

**Authentication & Calendar**

- Firebase Auth (staff login)
- Google Calendar API (event integration)

**Hosting**

- Frontend: Vercel
- Backend: Render (free tier)

**Tooling**

- GitHub
- dotenv
- Postman


## Demo Test Account

To explore staff features:

```
Email: staff@test.com
Password: Test1234
```

Note: Google Calendar integration will prompt sign-in with your own Google account.

Note: Staff role is assigned via Firebase custom claims. All test logins must be preconfigured as staff in Firebase Auth.


## Getting Started Locally

### Prerequisites

- Node.js and npm
- PostgreSQL (or SQLite for dev)
- Firebase project
- Google Developer Console access


### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/eventify.git
   cd eventify
2. **Environment variables**

   Create a `.env` file in both the `server/` and `client/` directories.

   Example `server/.env`:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/eventify
   GOOGLE_API_KEY=your_google_api_key
   ```

   Example `client/.env`:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   ```

3. **Install dependencies**
   ```bash
   cd server
   npm install

   cd ../client
   npm install
   ```

4. **Set up the database**
   ```bash
   cd server
   npx prisma migrate dev
   npx prisma db seed
   ```

5. **Run the app**
   ```bash
   # In one terminal
   cd server
   npm run dev
   ```

   ```bash
   # In another terminal
   cd client
   npm run dev
   ```