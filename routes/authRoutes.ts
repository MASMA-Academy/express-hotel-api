import { express } from "../deps.ts";
import * as AuthController from "../controllers/authController.ts";
import { adminOnly, protect } from "../middlewares/authMiddleware.ts";


const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/promote", protect, adminOnly, AuthController.promote);

export { router as authRouter };
 