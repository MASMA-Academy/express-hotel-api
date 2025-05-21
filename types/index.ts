export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
}

export interface Hotel {
  id: number;
  name: string;
  location: string;
  description: string;
  rating: number;
  imageUrl?: string;
  createdAt: Date;
}

export interface Room {
  id: number;
  hotelId: number;
  roomNumber: string;
  type: string;
  price: number;
  capacity: number;
  available: boolean;
  createdAt: Date;
}

export interface Booking {
  id: number;
  userId: number;
  roomId: number;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  status: string;
  createdAt: Date;
}

export interface JwtPayload {
  userId: number;
  isAdmin: boolean;
}
