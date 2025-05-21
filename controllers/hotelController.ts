import { Request, Response } from "../deps.ts";
import * as HotelModel from "../models/hotelModel.ts";

export const getAllHotels = async (_req: Request, res: Response) => {
  try {
    const hotels = await HotelModel.getAllHotels();
    res.json(hotels);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error
      ? error.message
      : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

export const getHotel = async (req: Request, res: Response) => {
  try {
    const hotelId = parseInt(req.params.id);
    const hotel = await HotelModel.getHotelById(hotelId);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.json(hotel);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error
      ? error.message
      : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

export const createHotel = async (req: Request, res: Response) => {
  try {
    const { name, location, description, rating, imageUrl } = req.body;

    if (!name || !location) {
      return res.status(400).json({
        message: "Name and location are required",
      });
    }

    const hotel = await HotelModel.createHotel({
      name,
      location,
      description,
      rating,
      imageUrl,
    });

    res.status(201).json(hotel);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error
      ? error.message
      : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

export const updateHotel = async (req: Request, res: Response) => {
  try {
    const hotelId = parseInt(req.params.id);
    const { name, location, description, rating, imageUrl } = req.body;

    const hotel = await HotelModel.updateHotel(hotelId, {
      name,
      location,
      description,
      rating,
      imageUrl,
    });

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.json(hotel);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error
      ? error.message
      : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

export const deleteHotel = async (req: Request, res: Response) => {
  try {
    const hotelId = parseInt(req.params.id);
    const deleted = await HotelModel.deleteHotel(hotelId);

    if (!deleted) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.json({ message: "Hotel deleted successfully" });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error
      ? error.message
      : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};
