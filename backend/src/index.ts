import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";
import "dotenv/config";

const { WEBHOST } = process.env;
// import { createClient } from "@deepgram/sdk";
// import { APIKEY } from "./privateConfig.json";

// const deepgram = createClient(APIKEY);

// async function transcribe() {
//   const dgConnection = deepgram.listen.live({ model: "base" });
//   if (error) console.error(error);
//   const resultJson = JSON.stringify(result);
//   console.log(resultJson);
// }

const app = express();

const server = createServer(app);
const io = new Server(server, { cors: { origin: WEBHOST } });

io.on("connection", () => {
  console.log("a user connected");
});

server.listen(3001);
