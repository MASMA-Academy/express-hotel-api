import { Request, Response } from "../deps.ts";
import * as RoomModel from "../models/roomModel.ts";

export const getRoomsByHotel = async (req: Request, res: Response) => {
  try {
    const hotelId = parseInt(req.params.hotelId);
    const rooms = await RoomModel.getRoomsByHotelId(hotelId);
    res.json(rooms);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error
      ? error.message
      : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

export const getRoom = async (req: Request, res: Response) => {
  try {
    const roomId = parseInt(req.params.id);
    const room = await RoomModel.getRoomById(roomId);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json(room);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error
      ? error.message
      : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

export const createRoom = async (req: Request, res: Response) => {
  try {
    const { hotelId, roomNumber, type, price, capacity } = req.body;

    if (!hotelId || !roomNumber || !type) {
      return res.status(400).json({
        message: "Hotel ID, room number, and type are required",
      });
    }

    const room = await RoomModel.createRoom({
      hotelId,
      roomNumber,
      type,
      price,
      capacity,
    });

    res.status(201).json(room);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error
      ? error.message
      : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

export const updateRoom = async (req: Request, res: Response) => {
  try {
    const roomId = parseInt(req.params.id);
    const { hotelId, roomNumber, type, price, capacity, available } = req.body;

    const room = await RoomModel.updateRoom(roomId, {
      hotelId,
      roomNumber,
      type,
      price,
      capacity,
      available,
    });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json(room);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error
      ? error.message
      : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

export const deleteRoom = async (req: Request, res: Response) => {
  try {
    const roomId = parseInt(req.params.id);
    const deleted = await RoomModel.deleteRoom(roomId);

    if (!deleted) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json({ message: "Room deleted successfully" });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error
      ? error.message
      : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};
