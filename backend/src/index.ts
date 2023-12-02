import { createServer } from "http";
import { createClient } from "@deepgram/sdk";
import { APIKEY } from "./privateConfig.json";

const deepgram = createClient(APIKEY);

async function transcribe() {
  const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
    { url: "https://dpgr.am/spacewalk.wav" },
    { model: "base" },
  );
  if (error) console.error(error);
  const resultJson = JSON.stringify(result);
  console.log(resultJson);
}

const server = createServer((_req, res) => {
  res.writeHead(200);
  res.end("yeet");
  transcribe();
});

server.listen(3000);
