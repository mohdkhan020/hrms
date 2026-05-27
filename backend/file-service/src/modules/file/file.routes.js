// import express from "express";
// const router = express.Router();
// import upload from "../../middleware/upload.js";
// import { v2 as cloudinary } from "cloudinary";
// import { UserModel } from "../../models/UserModel.js";

// router.post("/upload/:userId", upload.single("image"), async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const user = await UserModel.findById(userId);

//     // delete old image
//     if (user?.profile_image_public_id) {
//       await cloudinary.uploader.destroy(user.profile_image_public_id);
//     }

//     // new uploaded image
//     const fileUrl = req.file.path;
//     const publicId = req.file.filename;

//     // MongoDB update
//     const updatedUser = await UserModel.findByIdAndUpdate(
//       userId,
//       {
//         profile_image: fileUrl,
//         profile_image_public_id: publicId,
//       },
//       { new: true },
//     );

//     res.status(200).json({
//       success: true,
//       fileUrl,
//       user: updatedUser,
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// export default router;

import express from "express";
const router = express.Router();

import upload from "../../middleware/upload.js";
import { UserModel } from "../../models/UserModel.js";

import { v2 as cloudinary } from "cloudinary";

router.post("/upload/:userId", upload.single("image"), async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("file==>", req.file);

    // existing user
    const user = await UserModel.findById(userId);

    // new image
    const fileUrl = req.file.path;
    const publicId = req.file.filename;

    // update user
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        profile_image: fileUrl,
        profile_image_public_id: publicId,
      },
      { new: true },
    );

    if(user?.profile_image_public_id){
      const result = await cloudinary.uploader.destroy(
        user.profile_image_public_id,
      );

      console.log("delete result =>", result);
    }


    // // delete old image
    // if (user?.profile_image_public_id) {
    //   await cloudinary.uploader.destroy(user.profile_image_public_id);
    // }

    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
