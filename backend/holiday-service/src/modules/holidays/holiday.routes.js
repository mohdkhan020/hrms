import express from "express";

import {
  //   addHolidayController,
  getHolidayByIdController,
  getAllHolidayController,
} from "./holiday.controller.js";

const router = express.Router();

//POST Routes
// router.post("/add-holiday", addHolidayController);

//GET Routes
// router.get("/me", meController);
router.get("/holidays", getAllHolidayController); // Add /auth prefix here
router.get("/holidays/:id", getHolidayByIdController); // Add /auth prefix here


export default router;
