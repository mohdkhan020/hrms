import express from 'express';
import {
  signUpController,
  loginController,
  verifyEmailController,
  refreshTokenController,
  meController,
} from "../auth/auth.controller.js";
import { signUpLimiter } from '../../middleware/rateLimiter.js';

const router = express.Router();

//POST Routes
router.post("/signup", signUpLimiter, signUpController);
router.post('/login', loginController);   // Add /auth prefix here
router.post("/verify-email", verifyEmailController);
router.post("/refresh-token", refreshTokenController);


//GET Routes
router.get("/me", meController);

export default router;
