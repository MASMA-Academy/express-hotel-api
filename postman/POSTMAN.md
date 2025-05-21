# Hotel API Postman Collection

This repository includes a Postman collection
(`hotel-api-postman-collection.json`) for testing the Hotel API endpoints.

## Importing the Collection

1. Open Postman
2. Click on "Import" in the top left
3. Select the `hotel-api-postman-collection.json` file
4. Click "Import"

## Setting Up Environment Variables

The collection uses two environment variables:

1. `baseUrl` - The base URL of the API (default: http://localhost:3000)
2. `authToken` - JWT token for authenticated requests

To set these up:

1. In Postman, click on "Environments" in the sidebar
2. Click "Create New Environment"
3. Name it "Hotel API"
4. Add the following variables:
   - `baseUrl`: `http://localhost:3000` (or your server URL)
   - `authToken`: Leave blank for now
5. Click "Save"
6. Select the "Hotel API" environment from the dropdown in the top right

## Authentication Flow

1. First, create a user with the "Register" endpoint in the Auth folder
2. Login with the new user credentials using the "Login" endpoint
3. From the response, copy the `token` value
4. Update your environment variable `authToken` with this token

## Testing Endpoints

The collection is organized into folders:

### Auth

- **Register**: Create a new user account
- **Login**: Authenticate and get JWT token

### Hotels

- **Get All Hotels**: List all hotels
- **Get Hotel by ID**: Get a specific hotel by ID
- **Create Hotel**: Add a new hotel (Admin only)
- **Update Hotel**: Update an existing hotel (Admin only)
- **Delete Hotel**: Remove a hotel (Admin only)

### Rooms

- **Get Rooms by Hotel**: Get all rooms for a specific hotel
- **Get Room by ID**: Get a specific room by ID
- **Create Room**: Add a new room (Admin only)
- **Update Room**: Update an existing room (Admin only)
- **Delete Room**: Remove a room (Admin only)

### Bookings

- **Get User Bookings**: Get the current user's bookings
- **Get Booking by ID**: Get a specific booking
- **Create Booking**: Make a new booking
- **Cancel Booking**: Cancel an existing booking

## Admin Access

To test admin-only endpoints:

1. Create a user with admin privileges in the database
2. Login with that user
3. Use the returned token for admin-protected endpoints

## Note on Variable IDs

For endpoints that require an ID (like `:id` or `:hotelId`), make sure to
replace the default value with actual IDs from your database.
