"use client";
import React from "react";
import { useCallStateHooks } from "@stream-io/video-react-sdk";
import styles from "./SwitchCameraButton.module.css"; // optional styling
import { useSystemMessage } from "../modals/notification/systemMessage/SystemMessageManager";
import Image from "next/image";

const SwitchCameraButton = () => {
  const { useCameraState } = useCallStateHooks();
  const { showMessage } = useSystemMessage()
  const { camera, selectedDevice, devices } = useCameraState();

  const switchCamera = async () => {
    if (!camera || !devices?.length) return;

    const currentDevice = devices.find((d) => d.deviceId === selectedDevice);
    const isFront =
      currentDevice?.label?.toLowerCase().includes("front") ?? true;

    const nextDevice = devices.find((d) =>
      isFront
        ? d.label.toLowerCase().includes("back") ||
          d.label.toLowerCase().includes("rear")
        : d.label.toLowerCase().includes("front")
    );

    if (nextDevice) {
      try {
        await camera.select(nextDevice.deviceId);
      } catch (err) {
        console.error("Failed to switch camera:", err);
      }
    } else {
      console.warn("No alternative camera found");
      showMessage("No alternative camera found", "info")
    }
  };

  return (
    <div
     onClick={switchCamera}
     className={styles.switchCameraButton}
    >
      <Image src="/assets/svgs/icons/switchcamera.svg" alt="switch camera icon" fill />
    </div>
  );
};

export default SwitchCameraButton