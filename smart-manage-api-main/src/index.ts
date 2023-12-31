import "reflect-metadata";

import { server } from "./app";
import "./app/websocket";

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
