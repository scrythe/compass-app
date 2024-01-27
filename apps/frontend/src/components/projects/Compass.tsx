import { createSignal, Component, Show } from "solid-js";
import styles from "./Compass.module.css";
import compassImg from "../../assets/compass.png";
import needleImg from "../../assets/needle.png";
import deleteImg from "../../assets/delete.png";

let COMPASS_ORIENTATION = 0;

const CompassComponent: Component = () => {
  const [isVisible, setVisible] = createSignal(false);
  let compassBody: HTMLImageElement;
  let storedVals: HTMLDivElement;

  const iOS = () => {
    let ua = navigator.userAgent.toLowerCase();
    if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod"))
      return true;
    return false;
  };

  function generateDeviceID() {
    let result = "";
    for (let i = 0; i < 30; i++) {
      result += Math.floor(Math.random() * 10);
    }
    return result;
  }

  interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
    requestPermission?: () => Promise<"granted" | "denied">;
  }
  const requestPermission = (
    DeviceOrientationEvent as unknown as DeviceOrientationEventiOS
  ).requestPermission;

  const adjustRotation = (rotation: number) => {
    let orientation = screen.orientation.type;
    rotation = Math.round(rotation)

    if (orientation == "landscape-primary") rotation += 90;
    if (orientation == "landscape-secondary") rotation += 270;

    if(rotation >= 360) rotation -= 360;

    return rotation;
  };

  const handleOrientationIOS = (event: DeviceOrientationEvent): number => {
    // @ts-ignore
    let rotation = event.webkitCompassHeading;
    return rotation;
  };

  const handleOrientationAND = (event: DeviceOrientationEvent): number => {
    let rotation = Math.abs(event.alpha! - 360);
    return rotation;
  };

  const requestOrientationPerm = async () => {
    localStorage.clear()
    if (iOS()) {
      if (typeof requestPermission !== "function") return;
      const permissionRes = await requestPermission();
      if (permissionRes == "denied") return;
      setVisible(true);
      addEventListener(
        "deviceorientation",
        (event: DeviceOrientationEvent) => {
          COMPASS_ORIENTATION = adjustRotation(handleOrientationIOS(event));
          compassBody.style.rotate = COMPASS_ORIENTATION + "deg";
        },
        false,
      );
    } else {
      setVisible(true);
      addEventListener(
        "deviceorientationabsolute",
        (event: DeviceOrientationEvent) => {
          COMPASS_ORIENTATION = adjustRotation(handleOrientationAND(event));
          compassBody.style.rotate = COMPASS_ORIENTATION + "deg";
        },
        true,
      );
    }
  };

  const populateListLocal = () => {
    storedVals.innerHTML = ""; // Clear the content before populating
  
    // Get all localStorage keys that include "compass"
    const compassKeys = Object.keys(localStorage).filter((key) =>
      key.includes("compass")
    );
  
    // Sort the keys based on the number after "compass-"
    compassKeys.sort((a, b) => {
      const numA = parseInt(a.replace("compass-", ""), 10);
      const numB = parseInt(b.replace("compass-", ""), 10);
      return numA - numB;
    });
  
    // Populate the list
    compassKeys.forEach((key) => {
      const listitem = document.createElement("li");
      const deleteIcon = document.createElement("img");
      deleteIcon.src = deleteImg;
      deleteIcon.height = 20;
      listitem.innerHTML = localStorage.getItem(key);
      listitem.appendChild(deleteIcon);
      storedVals?.appendChild(listitem);
  
      deleteIcon.addEventListener("click", () => {
        deleteLS(key);
      });
    });
  };
  

  const deleteLS = (x: string) => {
    localStorage.removeItem(x);
    // @ts-ignore
    storedVals.replaceChildren();
    populateListLocal();
  };

  let keyCounter = 0;
  const saveOrientation = () => {
    // @ts-ignore
    storedVals.replaceChildren();

    if (!localStorage.getItem("device-id"))
      localStorage.setItem("device-id", generateDeviceID());

    if (!navigator.onLine) {
    } else {
      localStorage.setItem("compass-" + keyCounter.toString(), COMPASS_ORIENTATION.toString());
      keyCounter++;
      populateListLocal();
    }
    console.log(localStorage)
  };

  return (
    <main class={styles.main}>
      <Show when={!isVisible()}>
        <button onClick={requestOrientationPerm}>Allow Compass</button>
      </Show>
      <Show when={isVisible()}>
        <div class={styles.compassBody}>
          <img src={compassImg} alt="compass" />
          <img
            src={needleImg}
            ref={compassBody!}
            alt="compass needle"
            id={styles.needle}
            onclick={saveOrientation}
          />
         
        </div>
        <div ref={storedVals!} id={styles.storedVals}></div>
      </Show>
    </main>
  );
};

export default CompassComponent;
