import { express } from "../deps.ts";
import * as BookingController from "../controllers/bookingController.ts";
import { protect } from "../middlewares/authMiddleware.ts";

const router = express.Router();

router.get("/", protect, BookingController.getUserBookings);
router.get("/:id", protect, BookingController.getBooking);
router.post("/", protect, BookingController.createBooking);
router.put("/:id/cancel", protect, BookingController.cancelBooking);

export { router as bookingRouter };
