class VoiceInput {
  private microphone?: MediaRecorder;

  constructor() {}

  private createMicrophone(): Promise<MediaRecorder> {
    return new Promise(async (resolve, reject) => {
      const userMedia = await navigator.mediaDevices
        .getUserMedia({
          audio: true,
        })
        .catch(reject);
      if (!userMedia) return;
      resolve(new MediaRecorder(userMedia));
    });
  }

  private async checkAndSetMicrophone(): Promise<MediaRecorder> {
    return new Promise(async (resolve, reject) => {
      if (this.microphone) return resolve(this.microphone);
      const microphone = await this.createMicrophone().catch(reject);
      if (!microphone) return;
      this.microphone = microphone;
      return resolve(this.microphone);
    });
  }

  async startMicrophone() {
    const microphone = await this.checkAndSetMicrophone().catch((error) => {
      if (error.name === "NotAllowedError")
        return alert("Requires Microphone Permissions in order to function");
      console.error(error);
    });
    if (!microphone) return;
    microphone.start(2000);
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
