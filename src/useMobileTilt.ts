// @ts-nocheck

import { useEffect, useState } from "react";

export const useMobileTilt = (x: any, y: any) => {
  const [permissionGranted, setPermissionGranted] = useState(false);

  const enableTilt = async () => {
    // Only iOS Safari needs this
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      const response = await DeviceOrientationEvent.requestPermission();
      if (response === "granted") {
        setPermissionGranted(true);
      }
    } else {
      // Android / others
      setPermissionGranted(true);
    }
  };

  useEffect(() => {
    if (!permissionGranted) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const { beta = 0, gamma = 0 } = event;
      x.set(gamma / 45); // left-right tilt
      y.set(beta / 45); // front-back tilt
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () =>
      window.removeEventListener("deviceorientation", handleOrientation);
  }, [permissionGranted, x, y]);

  return { enableTilt };
};
