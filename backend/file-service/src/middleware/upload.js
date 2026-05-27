import cloudinary from "../lib/cloudinary.js";
import multer from "multer"
import  { CloudinaryStorage } from  "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "hrms-employees",
    allowed_formats: ["jpg", "png", "jpeg", "pdf"],
  },
});

const upload = multer({ storage });

export default  upload;
