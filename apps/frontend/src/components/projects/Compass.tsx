import { createSignal, Component, Show } from "solid-js";
import styles from "./Compass.module.css";
import backgroundImg from "../../assets/background.jpg";
import compassImg from "../../assets/compass.png";
import needleImg from "../../assets/needle.png";

const CompassComponent: Component = () => {
  const [isVisible, setVisible] = createSignal(false);
  let compassBody: HTMLDivElement;

  const iOS = () => {
    let ua = navigator.userAgent.toLowerCase();
    if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod"))
      return true;
    return false;
  };

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

  const handleOrientationIOS = (event: DeviceOrientationEvent) => {
    // @ts-ignore
    let rotation = event.webkitCompassHeading;
    compassBody.style.rotate = "-" + adjustRotation(rotation) + "deg";
  };

  const handleOrientationAND = (event: DeviceOrientationEvent) => {
    let rotation = Math.abs(event.alpha! - 360);
    compassBody.style.rotate = "-" + adjustRotation(rotation) + "deg";
  };

  const requestOrientationPerm = async () => {
    if (iOS()) {
      if (typeof requestPermission !== "function") return;
      const permissionRes = await requestPermission();
      if (permissionRes == "denied") return;
      setVisible(true);
      addEventListener("deviceorientation", handleOrientationIOS, false);
    } else {
      setVisible(true);
      // @ts-ignore
      addEventListener("deviceorientationabsolute", handleOrientationAND, true);
    }
  };

  return (
    <main class={styles.main}>
      <img class={styles.background} src={backgroundImg} alt="background" />
      <Show when={!isVisible()}>
        <button onClick={requestOrientationPerm}>Allow Compass</button>
      </Show>
      <Show when={isVisible()}>
        <div ref={compassBody!} class={styles.compassBody}>
          <img src={compassImg} alt="compass" />
        </div>
        <div class={styles.invisible} id={styles.needle}>
          <img src={needleImg} alt="compass needle" />
        </div>
      </Show>
    </main>
  );
};

export default CompassComponent;
