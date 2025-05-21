import { Request, Response } from "../deps.ts";
import * as BookingModel from "../models/bookingModel.ts";

export const getUserBookings = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const bookings = await BookingModel.getBookingsByUserId(userId);
    res.json(bookings);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error
      ? error.message
      : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

export const getBooking = async (req: Request, res: Response) => {
  try {
    const bookingId = parseInt(req.params.id);
    const booking = await BookingModel.getBookingById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if the booking belongs to the current user or if user is admin
    if (booking.userId !== req.user?.userId && !req.user?.isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(booking);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error
      ? error.message
      : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { roomId, checkIn, checkOut, guests } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!roomId || !checkIn || !checkOut || !guests) {
      return res.status(400).json({
        message:
          "Room ID, check-in date, check-out date, and number of guests are required",
      });
    }

    const booking = await BookingModel.createBooking({
      userId,
      roomId,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guests,
    });

    res.status(201).json(booking);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error
      ? error.message
      : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const bookingId = parseInt(req.params.id);
    const booking = await BookingModel.getBookingById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if the booking belongs to the current user or if user is admin
    if (booking.userId !== req.user?.userId && !req.user?.isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    const cancelledBooking = await BookingModel.cancelBooking(bookingId);

    res.json(cancelledBooking);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error
      ? error.message
      : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};
