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

    if (orientation == "landscape-primary") rotation += 90;
    if (orientation == "landscape-secondary") rotation += 270;

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
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i)?.includes("compass")) { 
        let listitem = document.createElement("li");
        let deleteIcon = document.createElement("img");
        deleteIcon.src = deleteImg;
        deleteIcon.height = 20;
        // @ts-ignore
        listitem.innerHTML = localStorage.getItem(localStorage.key(i));
        listitem.appendChild(deleteIcon);
        storedVals?.appendChild(listitem);
        // @ts-ignore
        deleteIcon.addEventListener("click", () => {
          deleteLS(localStorage.key(i)?.toString());
        });
      }
    }
  };

  const deleteLS = (x: string) => {
    localStorage.removeItem(x);
    // @ts-ignore
    storedVals.replaceChildren();
    populateListLocal();
  };

  const saveOrientation = (event: DeviceOrientationEvent) => {
    // @ts-ignore
    storedVals.replaceChildren();

    if (!localStorage.getItem("device-id"))
      localStorage.setItem("device-id", generateDeviceID());

    if (!navigator.onLine) {
    } else {
      localStorage.setItem(
        "compass-" + localStorage.length.toString(),
        Math.round(COMPASS_ORIENTATION).toString(),
      );
      populateListLocal();
    }
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
