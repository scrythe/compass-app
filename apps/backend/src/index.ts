import { createServer } from "http";
import { Server, Socket } from "socket.io";
import "dotenv/config";
import {
  DeepgramClient,
  LiveClient,
  LiveTranscriptionEvents,
  createClient,
} from "@deepgram/sdk";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "socket-types";

type SocketType = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

const { APIKEY, WEBHOST, PORT = 3001 } = process.env;

const deepgram: DeepgramClient = createClient(APIKEY!);

async function setupDeepgram(socket: SocketType) {
  const connection = deepgram?.listen.live({
    language: "en",
    punctuate: true,
    smart_format: true,
    model: "nova",
  });
  connection.on(LiveTranscriptionEvents.Open, () =>
    handleOpenedConnection(socket, connection),
  );
  return connection;
}

function handleOpenedConnection(socket: SocketType, connection: LiveClient) {
  socket.on("packetSent", (data) => connection.send(data));

  connection.on(LiveTranscriptionEvents.Transcript, (data) => {
    const transcript = data.channel.alternatives[0].transcript ?? "";
    socket.emit("transcript", transcript);
  });
}

async function closeConnection(connection: LiveClient) {
  connection.finish();
  connection.removeAllListeners();
}

const server = createServer();
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, { cors: { origin: WEBHOST } });

io.on("connection", async (socket) => {
  const connection = await setupDeepgram(socket);
  console.log("a user connected");
  socket.on("disconnect", () => closeConnection(connection));
});

server.listen(PORT, () => console.log("Server listening on Port: " + PORT));
