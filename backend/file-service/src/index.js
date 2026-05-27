import dotenv from "dotenv";
import "dotenv/config";
import express from "express";
import router from "./modules/file/file.routes.js";
import cors from 'cors'
import { dbConnect } from "./lib/mongodb.js";
import { pool } from "./lib/postgresql.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT

// app.use();
// app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//   console.log("Incoming query:", req.query);
//   next();
// });
// app.use(mongoSanitize()); //Ye automatically: $ . remove kar deta hai request se
// app.use(helmet());

// Update CORS to allow API Gateway
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://api-gateway:8000",
      "http://localhost:8000",
    ],
    methods: "GET,POST,PUT,PATCH,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  }),
);

// ✅ MongoDB connect FIRST
await dbConnect();

// PostgreSQl DB Connect
pool
  .connect()
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

//routes
app.use("/api", router);


app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 File service running on http://localhost:${PORT}`);
});
