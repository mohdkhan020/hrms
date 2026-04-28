import express from 'express';
import { signUpControllers } from '../controllers/auth/signUpControllers.js';
import { loginControllers } from '../controllers/auth/loginControllers.js';
import { signUpLimiter } from '../middleware/rateLimiter.js';
import { verifyEmailController } from "../controllers/auth/verifyEmailController.js";
import { refreshTokenController } from "../controllers/auth/refreshTokenController.js";
import { meController} from "../controllers/auth/meController.js";

const router = express.Router();

// router.post('/signup', signUpControllers); // Add /auth prefix here
router.post("/signup", signUpLimiter, signUpControllers);
router.post('/login', loginControllers);   // Add /auth prefix here
router.post("/verify-email", verifyEmailController);
router.post("/refresh-token", refreshTokenController);
router.get("/me", meController);

export default router;
