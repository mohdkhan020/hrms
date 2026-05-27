import { pool } from "../../lib/postgresql.js";

export const addHolidayController = async (req, res) => {
  try {
    const { holiday_name, holiday_date, description } = req.body;

    // validation
    if (!holiday_name || !holiday_date) {
      return res.status(400).json({
        success: false,
        message: "Holiday name and date are required",
      });
    }

    // insert holiday
    const result = await pool.query(
      `
      INSERT INTO holidays
      (
        holiday_name,
        holiday_date,
        description
      )
      VALUES ($1, $2, $3)
      RETURNING *;
      `,
      [holiday_name, holiday_date, description],
    );

    res.status(201).json({
      success: true,
      message: "Holiday added successfully",
      holiday: result.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getHolidayByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT *
      FROM holidays
      WHERE id = $1
      `,
      [id],
    );

    // holiday not found
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Holiday not found",
      });
    }

    res.status(200).json({
      success: true,
      holiday: result.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getAllHolidayController = async (req, res) => {
  try {
    // const { id } = req.params;

    const result = await pool.query(
      `
      SELECT * FROM holidays
      `,[],
    );

    // holiday not found
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Holiday not found",
      });
    }

    res.status(200).json({
      success: true,
      holiday: result.rows,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
