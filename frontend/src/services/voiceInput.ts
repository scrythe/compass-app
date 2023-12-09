import { Setter } from "solid-js";

class VoiceInput {
  private microphone?: MediaRecorder;
  private mediaStream?: MediaStream;
  private talking: Setter<boolean>;

  constructor(talking: Setter<boolean>) {
    this.talking = talking;
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
    microphone.start(2000);
    this.talking(true);
  }

  stopMicrophone() {
    this.microphone?.stop();
    this.talking(false);
    this.mediaStream?.getTracks().forEach((track) => track.stop());
    this.microphone = undefined;
  }
}

export default VoiceInput;

// async functon askForMicPerm()

// function sendRecording(_microphone: MediaRecorder) {}

// async function micBtnPress() {
//   const microphone = await createMicrophone();
//   sendRecording(microphone);
// }

// function startMicrophone(microphone: MediaRecorder) {
//   microphone.start();
// }
