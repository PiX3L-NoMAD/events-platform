export type Role = 'STAFF' | 'ATTENDEE';

export interface User {
  id: string;
  email: string;
  name?: string;
  role: Role;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  datetime: string; // ISO string
  createdById: string;
  category: string;
  imageUrl?: string; // optional if not populated
  createdBy?: User;        // optional if not populated
  signups?: Signup[];      // optional if not populated
}

export interface Signup {
  id: string;
  userId: string;
  eventId: string;
  createdAt: string;
  user?: User;             // optional if not populated
  event?: Event;           // optional if not populated
}
