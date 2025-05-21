import { express } from "../deps.ts";
import * as HotelController from "../controllers/hotelController.ts";
import { adminOnly, protect } from "../middlewares/authMiddleware.ts";

const router = express.Router();

router.get("/", HotelController.getAllHotels);
router.get("/:id", HotelController.getHotel);
router.post("/", protect, adminOnly, HotelController.createHotel);
router.put("/:id", protect, adminOnly, HotelController.updateHotel);
router.delete("/:id", protect, adminOnly, HotelController.deleteHotel);

export { router as hotelRouter };
