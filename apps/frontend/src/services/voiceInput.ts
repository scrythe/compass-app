import { Setter } from "solid-js";
import { Socket, io } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "socket-types";
type SocketType = Socket<ServerToClientEvents, ClientToServerEvents>;

class VoiceInput {
  private microphone?: MediaRecorder;
  private mediaStream?: MediaStream;
  private talking: Setter<boolean>;
  private outputText: Setter<string>;
  private totalText: string;
  private socket: SocketType;

  constructor(talking: Setter<boolean>, outputText: Setter<string>) {
    this.talking = talking;
    this.outputText = outputText;
    this.totalText = "";
    this.socket = io(import.meta.env.VITE_SOCKET_HOST);
  }

  private createMicrophone(): Promise<MediaRecorder> {
    return new Promise(async (resolve, reject) => {
      const stream = await navigator.mediaDevices
        .getUserMedia({
          audio: true,
        })
        .catch(reject);
      if (!stream) return;
      this.mediaStream = stream;
      resolve(new MediaRecorder(stream));
    });
  }

  private setAndGetMicrophone(): Promise<MediaRecorder> {
    return new Promise(async (resolve, reject) => {
      const microphone = await this.createMicrophone().catch(reject);
      if (!microphone) return;
      this.microphone = microphone;
      resolve(this.microphone);
    });
  }

  async startMicrophone() {
    const microphone = await this.setAndGetMicrophone().catch((error) => {
      if (error.name === "NotAllowedError")
        return alert("Requires Microphone Permissions in order to function");
      console.error(error);
    });

    if (!microphone) return this.talking(false);
    microphone.start(500);
    this.talking(true);
    this.sendData(microphone);
  }

  stopMicrophone() {
    this.microphone?.stop();
    this.talking(false);
    this.mediaStream?.getTracks().forEach((track) => track.stop());
    this.microphone = undefined;
  }

  private sendData(microphone: MediaRecorder) {
    microphone.ondataavailable = (blob) => {
      this.socket.emit("packetSent", blob.data);
    };
  }

  handleData() {
    this.socket.on("transcript", (data) => {
      this.totalText += " " + data;
      this.outputText(this.totalText);
    });
  }
}

export default VoiceInput;
