import db from "../config/db.ts";
import { Hotel } from "../types/index.ts";

export const getAllHotels = async (): Promise<Hotel[]> => {
  const result = await db.query("SELECT * FROM hotels ORDER BY name");
  return result.rows;
};

export const getHotelById = async (id: number): Promise<Hotel | null> => {
  const result = await db.query("SELECT * FROM hotels WHERE id = $1", [id]);
  return result.rows[0] || null;
};

export const createHotel = async (
  hotelData: Partial<Hotel>,
): Promise<Hotel> => {
  const { name, location, description, rating, imageUrl } = hotelData;

  const result = await db.query(
    "INSERT INTO hotels (name, location, description, rating, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, location, description, rating, imageUrl],
  );

  return result.rows[0];
};

export const updateHotel = async (
  id: number,
  hotelData: Partial<Hotel>,
): Promise<Hotel | null> => {
  const { name, location, description, rating, imageUrl } = hotelData;

  const result = await db.query(
    "UPDATE hotels SET name = $1, location = $2, description = $3, rating = $4, image_url = $5 WHERE id = $6 RETURNING *",
    [name, location, description, rating, imageUrl, id],
  );

  return result.rows[0] || null;
};

export const deleteHotel = async (id: number): Promise<boolean> => {
  const result = await db.query(
    "DELETE FROM hotels WHERE id = $1 RETURNING id",
    [id],
  );
  return result.rowCount > 0;
};
