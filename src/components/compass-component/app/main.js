document.getElementById("requestPermissionButton").addEventListener("click", requestOrientationPermission)

function iOS() {
  let ua = navigator.userAgent.toLowerCase()
  if(
    ua.includes("iphone") || 
    ua.includes("ipad")   || 
    ua.includes("ipod"))  return true

  return false
}


function requestOrientationPermission() {
  if (iOS()) {
    DeviceOrientationEvent.requestPermission()
      .then((permissionState) => {
        if (permissionState === "granted") {
          document.querySelector("#main").classList.remove("invisible");
          document.querySelector("#needle").classList.remove("invisible");
          document.querySelector("#requestPermissionButton").classList.add("invisible");

          window.addEventListener("deviceorientation", handleOrientationIOS, false);

        } else {
          console.error("Permission denied for orientation events");
        }
      })
      .catch((error) => {
        console.error("Error requesting orientation permission:", error);
      });
  } else {
    document.querySelector("#main").classList.remove("invisible");
    document.querySelector("#requestPermissionButton").classList.add("invisible");
    document.querySelector("#needle").classList.remove("invisible");
    window.addEventListener("deviceorientationabsolute", handleOrientationAND, true);
  }
}

function adjustRotation(rotation)
{
    let orientation = screen.orientation.type;

    if(orientation == "landscape-primary") rotation += 90
    if(orientation == "landscape-secondary") rotation += 270

    return rotation
}

function handleOrientationIOS(event) {
  let rotation = event.webkitCompassHeading;
  document.getElementById("main").style.rotate = "-" + adjustRotation(rotation) + "deg";
}

function handleOrientationAND(event) {
  let rotation = Math.abs(event.alpha - 360);
  document.getElementById("main").style.rotate = "-" + adjustRotation(rotation) + "deg";
}
