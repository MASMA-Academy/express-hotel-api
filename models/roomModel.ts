import db from "../config/db.ts";
import { Room } from "../types/index.ts";

export const getRoomsByHotelId = async (hotelId: number): Promise<Room[]> => {
  const result = await db.query("SELECT * FROM rooms WHERE hotel_id = $1", [
    hotelId,
  ]);
  return result.rows;
};

export const getRoomById = async (id: number): Promise<Room | null> => {
  const result = await db.query("SELECT * FROM rooms WHERE id = $1", [id]);
  return result.rows[0] || null;
};

export const createRoom = async (roomData: Partial<Room>): Promise<Room> => {
  const { hotelId, roomNumber, type, price, capacity } = roomData;

  const result = await db.query(
    "INSERT INTO rooms (hotel_id, room_number, type, price, capacity, available) VALUES ($1, $2, $3, $4, $5, true) RETURNING *",
    [hotelId, roomNumber, type, price, capacity],
  );

  return result.rows[0];
};

export const updateRoom = async (
  id: number,
  roomData: Partial<Room>,
): Promise<Room | null> => {
  const { hotelId, roomNumber, type, price, capacity, available } = roomData;

  const result = await db.query(
    "UPDATE rooms SET hotel_id = $1, room_number = $2, type = $3, price = $4, capacity = $5, available = $6 WHERE id = $7 RETURNING *",
    [hotelId, roomNumber, type, price, capacity, available, id],
  );

  return result.rows[0] || null;
};

export const deleteRoom = async (id: number): Promise<boolean> => {
  const result = await db.query(
    "DELETE FROM rooms WHERE id = $1 RETURNING id",
    [id],
  );
  return result.rowCount > 0;
};
