// import express from 'express';
// import { signUpControllers } from '../controllers/auth/signUpControllers.js';
// import { loginControllers } from '../controllers/auth/loginControllers.js';

// const  router = express.Router();

// router.post('/signup',signUpControllers)
// router.post('/login',loginControllers)

// // module.exports = {router};
// export default router;
import express from 'express';
import { signUpControllers } from '../controllers/auth/signUpControllers.js';
import { loginControllers } from '../controllers/auth/loginControllers.js';

const router = express.Router();

router.post('/auth/signup', signUpControllers); // Add /auth prefix here
router.post('/auth/login', loginControllers);   // Add /auth prefix here

export default router;