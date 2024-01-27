async function sendPost(action: string, postData: Object) {
  return new Promise(async (resolve) => {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(postData),
    };
    const url = `http://localhost:4000/${action}.php`;
    const jsonData = await fetch(url, options).catch((e) => console.error(e));
    if (!jsonData) return;
    const data = await jsonData.json();
    resolve(data);
  });
}

export function saveOrientationDB(
  deviceId: number,
  rotationId: number,
  rotation: number,
) {
  return sendPost("saveOrientation", {
    deviceId,
    rotationId,
    rotation,
  });
}

export function getOrientations() {
  return sendPost("getOrientations", {});
}
