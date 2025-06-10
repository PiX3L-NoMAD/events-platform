# Eventify – Community Event Hub

Eventify is a full-stack web platform where community members can browse upcoming events, sign up to attend, and add them directly to their Google Calendar. Staff users can log in securely to create, edit, and manage events.

- Live site: [https://eventify-events-platform.vercel.app/](https://eventify-events-platform.vercel.app/)
- API: [https://events-platform-1hnt.onrender.com/](https://events-platform-1hnt.onrender.com/) 
- GitHub repo: https://github.com/PiX3L-NoMAD/eventify-events-platform


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
- Backend: Render

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
   git clone https://github.com/PiX3L-NoMAD/events-platform.git
   cd events-platform
   ```
2. **Environment variables**

   Create a `.env` file in both the `server/` and `client/` directories.

   Example `server/.env`:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/eventify
   ```

   Example `client/.env`:
   ```env
   VITE_API_URL=https://events-platform-1hnt.onrender.com
   VITE_FIREBASE_API_KEY=your_firebase_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   ```
   ⚠️ You must manually create these .env files — they are not included in the repo.

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
## Note on Accessibility

- Manual keyboard navigation tested (Tab/Shift+Tab, Enter activation)
- Screen-reader labels applied (e.g., visually hidden form labels)
- Checked with Lighthouse (Accessibility score: 18/20)
- Verified with WAVE for form labels and critical issues
