import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import swaggerUi from "swagger-ui-express";

import "../database";
import routes from "../routes";
import swaggerDoc from "../swagger.json";

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(routes);

export { server, io };
