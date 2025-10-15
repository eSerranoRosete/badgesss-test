// @ts-nocheck
import { useEffect, useState } from "react";

export const useMobileTilt = (x: any, y: any) => {
  const [permissionGranted, setPermissionGranted] = useState(false);

  const enableTilt = async () => {
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      try {
        const response = await DeviceOrientationEvent.requestPermission();
        if (response === "granted") setPermissionGranted(true);
      } catch (err) {
        console.error("Device orientation permission denied:", err);
      }
    } else {
      setPermissionGranted(true);
    }
  };

  useEffect(() => {
    if (!permissionGranted) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const { beta = 0, gamma = 0 } = event;

      // Flip/invert direction to make it feel more natural on mobile
      const tiltX = -(gamma / 45); // ← inverts left-right
      const tiltY = beta / 45; // normal front-back (flip if needed)

      x.set(tiltX);
      y.set(tiltY);
    };

    window.addEventListener("deviceorientation", handleOrientation, true);
    return () =>
      window.removeEventListener("deviceorientation", handleOrientation, true);
  }, [permissionGranted, x, y]);

  return { enableTilt };
};
