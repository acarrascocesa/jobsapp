// API DOcumenATion
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";

// Package Imports
import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import connecDB from "./database/db.js";
import cors from "cors";
import morgan from "morgan";

// Securty Packges
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

// Routes Imports
import testRoutes from "./routes/test.routes.js";
import authRoutes from "./routes/auth.routes.js";
import errroMiddelware from "./middlewares/error.middleware.js";
import jobsRoutes from "./routes/jobs.routes.js";
import userRoutes from "./routes/user.routes.js";

// Rest object
const app = express();

// Middlewares
app.use(helmet(``));
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Dotenv Config
dotenv.config();

// MongoDB Connection
connecDB();

// Swagger api config
// swagger api options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal Application",
      description: "Node Expressjs Job Portal Application",
    },
    servers: [
      {
        //         url: "http://localhost:8080",
        url: "https://nodejs-job-portal-app.onrender.com",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const spec = swaggerDoc(options);

// Routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobsRoutes);

// Homeroute Root
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));

// Validation Middelware
app.use(errroMiddelware);

// Listen
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Api running on port: ${PORT}`);
});
