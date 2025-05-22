import { cors, dotenv, express, loadEnv, Request, Response } from "./deps.ts";
import { authRouter } from "./routes/authRoutes.ts";
import { hotelRouter } from "./routes/hotelRoutes.ts";
import { roomRouter } from "./routes/roomRoutes.ts";
import { bookingRouter } from "./routes/bookingRoutes.ts";
import { errorHandler } from "./middlewares/errorMiddleware.ts";

// Load environment variables from .env file
const env = loadEnv({ export: true });

// Configure dotenv as well for compatibility with Node.js packages
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);

// Home route
app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Welcome to Hotel Booking API" });
});

// Error handler
app.use(errorHandler);

export default app;
