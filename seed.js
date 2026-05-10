import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from './utils/logger.js';
import User from './models/UserModel.js';
import Event from './models/EventModel.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const now = new Date();
const addYears = (n) => new Date(now.getFullYear() + n, now.getMonth(), now.getDate(), now.getHours(), now.getMinutes());

if (!MONGO_URI) {
  logger.error('Please set MONGO_URI in your environment before running the seeder.');
  process.exit(1);
}

const usersData = [
  { firstName: 'Alice', lastName: 'Johnson', email: 'alice@example.com', password: 'Password123!', role: 'attendee' },
  { firstName: 'Bob', lastName: 'Smith', email: 'bob@example.com', password: 'Password123!', role: 'organizer' },
  { firstName: 'Eve', lastName: 'Admin', email: 'admin@example.com', password: 'AdminPass123!', role: 'admin' },
];

const sampleEvents = [
  {
    title: 'Tech Meetup: Modern Web',
    description: 'A hands-on meetup covering modern web development best practices and tooling. Join local developers and designers for talks and networking.',
    date: addYears(2),
    time: '18:30',
    venue: 'City Conference Hall',
    ticketTypes: [
      { type: 'General', price: 20, quantity: 100, remaining: 0 },
      { type: 'VIP', price: 50, quantity: 20, remaining: 0 },
    ],
    discountCodes: [
      { code: 'EARLY10', discountPercentage: 10, expiryDate: addYears(2) }
    ],
    image: 'image-1719169595444-image.webp'
  },
  {
    title: 'Design Thinking Workshop',
    description: 'Interactive workshop on product design and user research. Small groups, hands-on exercises, and templates to take home.',
    date: addYears(3),
    time: '10:00',
    venue: 'Studio 5',
    ticketTypes: [
      { type: 'Attendee', price: 35, quantity: 50, remaining: 0 }
    ],
    discountCodes: [],
    image: 'image-1719171036404-image.webp'
  },
  {
    title: 'Startup Pitch Night',
    description: 'Local founders pitch to an audience of investors and peers. Great for networking and early-stage feedback.',
    date: addYears(2),
    time: '19:00',
    venue: 'Innovation Hub',
    ticketTypes: [
      { type: 'General', price: 10, quantity: 150, remaining: 0 }
    ],
    discountCodes: [{ code: 'PITCH5', discountPercentage: 5, expiryDate: addYears(2) }],
    image: 'image-1719169595444-image.webp'
  },
  {
    title: 'Photography Walk & Talk',
    description: 'A relaxed photo walk through the city with tips from a local photographer. Bring comfortable shoes and a camera.',
    date: addYears(3),
    time: '08:30',
    venue: 'Riverside Park',
    ticketTypes: [
      { type: 'General', price: 15, quantity: 60, remaining: 0 }
    ],
    discountCodes: [],
    image: 'image-1719171036404-image.webp'
  },
  {
    title: 'Product Design Sprint',
    description: 'Two-day sprint to prototype and test a product idea with mentors and real users.',
    date: addYears(4),
    time: '09:00',
    venue: 'Design Lab',
    ticketTypes: [
      { type: 'Early Bird', price: 120, quantity: 20, remaining: 0 },
      { type: 'Regular', price: 200, quantity: 50, remaining: 0 }
    ],
    discountCodes: [{ code: 'SPRINT20', discountPercentage: 20, expiryDate: addYears(3) }],
    image: 'image-1719169595444-image.webp'
  }
];

const run = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    logger.info('Connected to DB');

    // Cleanup existing
    await User.deleteMany({});
    await Event.deleteMany({});

    // Create users
    const createdUsers = [];
    for (const u of usersData) {
      try {
        const user = await User.signup(u.firstName, u.lastName, u.email, u.password, u.role);
        createdUsers.push(user);
        logger.info('Created user:', user.email);
      } catch (err) {
        logger.warn('Skipping user creation (might already exist):', u.email, err.message);
      }
    }

    const organizer = createdUsers.find((x) => x.role === 'organizer');
    const attendee = createdUsers.find((x) => x.role === 'attendee');

    // Create events
    for (const ev of sampleEvents) {
      const event = new Event({
        ...ev,
        organizer: organizer ? organizer._id : null,
      });

      // Add an attendee for demonstration
      if (attendee) {
        event.attendees.push(attendee._id);
      }

      await event.save();
      logger.info('Created event:', event.title);
    }

    logger.info('Seeding complete.');
    process.exit(0);
  } catch (error) {
    logger.error('Seeder error:', error);
    process.exit(1);
  }
};

run();
