import { express } from "../deps.ts";
import * as RoomController from "../controllers/roomController.ts";
import { adminOnly, protect } from "../middlewares/authMiddleware.ts";

const router = express.Router();

router.get("/hotel/:hotelId", RoomController.getRoomsByHotel);
router.get("/:id", RoomController.getRoom);
router.post("/", protect, adminOnly, RoomController.createRoom);
router.put("/:id", protect, adminOnly, RoomController.updateRoom);
router.delete("/:id", protect, adminOnly, RoomController.deleteRoom);

export { router as roomRouter };
 