Demo Accounts
=============

The seeder creates three demo accounts you can use for showcasing the app.

1) Admin
- Email: admin@example.com
- Password: AdminPass123!
- Role: admin
- Portal: /admin (after login)

2) Organizer
- Email: bob@example.com
- Password: Password123!
- Role: organizer
- Portal: /organizer (after login)

3) Attendee
- Email: alice@example.com
- Password: Password123!
- Role: attendee
- Portal: /attendee (after login)

Notes
- The backend serves static images at `/api/uploads/<filename>`. Seeded events reference local files in `Public/uploads` (image-1719169595444-image.webp, image-1719171036404-image.webp).
- To re-seed the database, run `npm run seed` from `Event-Management-Backend-Deploy` (this will remove existing users/events and recreate demo data).
- Backend health check: `http://localhost:8050/health`
- Frontend default dev server: `http://localhost:3000` (if that port is busy, CRA will prompt to use another port).

Recommendation for portfolio
- Add these three accounts (copy the credentials above) to your portfolio README so recruiters can log in quickly.
