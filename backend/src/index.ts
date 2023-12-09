import { createServer } from "http";
import { Server, Socket } from "socket.io";
import "dotenv/config";
import {
  DeepgramClient,
  LiveClient,
  LiveTranscriptionEvents,
  createClient,
} from "@deepgram/sdk";

const { APIKEY, WEBHOST } = process.env;

const deepgram: DeepgramClient = createClient(APIKEY!);

async function setupDeepgram(socket: Socket) {
  const connection = deepgram?.listen.live({
    language: "en",
    punctuate: true,
    smart_format: true,
    model: "nova",
  });
  connection.on(LiveTranscriptionEvents.Open, () =>
    handleOpenedConnection(socket, connection),
  );
}

function handleOpenedConnection(socket: Socket, connection: LiveClient) {
  socket.on("packet-sent", (data) => connection.send(data));

  connection.on(LiveTranscriptionEvents.Transcript, (data) => {
    const transcript = data.channel.alternatives[0].transcript ?? "";
    socket.emit("transcript", transcript);
  });
}

const server = createServer();
const io = new Server(server, { cors: { origin: WEBHOST } });

io.on("connection", (socket) => {
  setupDeepgram(socket);
  console.log("a user connected");
});

server.listen(3001);
