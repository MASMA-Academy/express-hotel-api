# Express Hotel API

A RESTful API for hotel booking systems built with Deno, Express, and
PostgreSQL. This API allows users to browse hotels, check room availability, and
make bookings.

## Features

- **Authentication System**: User registration, login with JWT
- **Hotel Management**: Create, read, update, and delete hotels (admin only)
- **Room Management**: Manage rooms within hotels (admin only)
- **Booking System**: Allow users to book available rooms and cancel bookings
- **Role-based Access Control**: Different permissions for regular users and
  administrators

## Tech Stack

- **Runtime**: [Deno](https://deno.land/)
- **Framework**: [Express](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Authentication**: [JWT (JSON Web Tokens)](https://jwt.io/)
- **Password Hashing**: [bcrypt](https://www.npmjs.com/package/bcrypt)

## Prerequisites

- Deno 1.38 or higher
- PostgreSQL database
- Node.js (for `node_modules` dependencies)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/express-hotel-api.git
   cd express-hotel-api
   ```

2. Set up the database:
   ```bash
   psql -f schema.sql
   ```

3. Create a `.env` file based on the `.env.example` file:
   ```bash
   cp env.example .env
   ```

4. Edit the `.env` file with your database credentials and JWT secret.

## Running the Application

Start the server in development mode:

```bash
deno task start
```

This will start the server on http://localhost:3000 (or the port specified in
your .env file).

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Hotels

- `GET /api/hotels` - Get all hotels
- `GET /api/hotels/:id` - Get a specific hotel
- `POST /api/hotels` - Create a new hotel (admin only)
- `PUT /api/hotels/:id` - Update a hotel (admin only)
- `DELETE /api/hotels/:id` - Delete a hotel (admin only)

### Rooms

- `GET /api/rooms/hotel/:hotelId` - Get all rooms for a specific hotel
- `GET /api/rooms/:id` - Get a specific room
- `POST /api/rooms` - Create a new room (admin only)
- `PUT /api/rooms/:id` - Update a room (admin only)
- `DELETE /api/rooms/:id` - Delete a room (admin only)

### Bookings

- `GET /api/bookings` - Get all bookings for the authenticated user
- `GET /api/bookings/:id` - Get a specific booking
- `POST /api/bookings` - Create a new booking
- `PUT /api/bookings/:id/cancel` - Cancel a booking

## Testing

Run tests using:

```bash
deno task test
```

## Environment Variables

- `PORT` - The port the server will run on (default: 3000)
- `JWT_SECRET` - Secret for JWT token generation
- `DB_HOST` - PostgreSQL host
- `DB_PORT` - PostgreSQL port
- `DB_USER` - PostgreSQL username
- `DB_PASSWORD` - PostgreSQL password
- `DB_NAME` - PostgreSQL database name
- `ADMIN_USERNAME` - Default admin username (default: "admin")
- `ADMIN_EMAIL` - Default admin email (default: "admin@example.com")
- `ADMIN_PASSWORD` - Default admin password (default: "admin123")

## Default Admin User

On the first run of the application, if no admin users exist in the database, a
default admin user will be created automatically with the following credentials:

- Username: admin (or the value of ADMIN_USERNAME environment variable)
- Email: admin@example.com (or the value of ADMIN_EMAIL environment variable)
- Password: admin123 (or the value of ADMIN_PASSWORD environment variable)

**Important Security Note**: This default password should be changed immediately
in a production environment!

## Database Schema

The database consists of the following tables:

- `users` - User information and authentication
- `hotels` - Hotel details
- `rooms` - Room information, linked to hotels
- `bookings` - Booking information, linked to users and rooms

See `schema.sql` for the complete database structure.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for
details.
