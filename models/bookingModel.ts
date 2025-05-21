import db from "../config/db.ts";
import { Booking } from "../types/index.ts";

export const getBookingsByUserId = async (
  userId: number,
): Promise<Booking[]> => {
  const result = await db.query("SELECT * FROM bookings WHERE user_id = $1", [
    userId,
  ]);
  return result.rows;
};

export const getBookingById = async (id: number): Promise<Booking | null> => {
  const result = await db.query("SELECT * FROM bookings WHERE id = $1", [id]);
  return result.rows[0] || null;
};

export const createBooking = async (
  bookingData: Partial<Booking>,
): Promise<Booking> => {
  const { userId, roomId, checkIn, checkOut, guests } = bookingData;

  // First, check if the room is available
  const roomResult = await db.query(
    "SELECT available FROM rooms WHERE id = $1",
    [roomId],
  );
  if (!roomResult.rows[0] || !roomResult.rows[0].available) {
    throw new Error("Room is not available for booking");
  }

  // Create booking transaction
  const client = await db.connect();
  try {
    await client.query("BEGIN");

    // Create booking
    const bookingResult = await client.query(
      "INSERT INTO bookings (user_id, room_id, check_in, check_out, guests, status) VALUES ($1, $2, $3, $4, $5, 'confirmed') RETURNING *",
      [userId, roomId, checkIn, checkOut, guests],
    );

    // Update room availability
    await client.query("UPDATE rooms SET available = false WHERE id = $1", [
      roomId,
    ]);

    await client.query("COMMIT");
    return bookingResult.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const cancelBooking = async (id: number): Promise<Booking | null> => {
  const client = await db.connect();
  try {
    await client.query("BEGIN");

    // Update booking status
    const bookingResult = await client.query(
      "UPDATE bookings SET status = 'cancelled' WHERE id = $1 RETURNING *",
      [id],
    );

    if (bookingResult.rows.length > 0) {
      // Make room available again
      await client.query(
        "UPDATE rooms SET available = true WHERE id = $1",
        [bookingResult.rows[0].room_id],
      );
    }

    await client.query("COMMIT");
    return bookingResult.rows[0] || null;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
