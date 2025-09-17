"use client";
import { useAuth } from "@/app/context/Authcontext";
import LoadingScreen from "@/components/loading/LoadingScreen";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import {
  User,
  StreamVideoClient,
  StreamVideo,
  StreamCall,
  useCallStateHooks,
  useDeviceList,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { MyLiveStreamUI } from "@/components/livestream/MyLiveStreamUI";
import RequestPermissionButton from "@/components/livestream/RequestPermissionButton";
import styles from "./broadcast.module.css";
import { createStreamToken } from "@/app/(server)/streamio/create-token";

type BroadcastProps = {
  streamIOAPIKey: string;
};

const Broadcast: FC<BroadcastProps> = ({ streamIOAPIKey: apiKey }) => {
  const { user: authUser, loading } = useAuth();
  const router = useRouter();
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<any>(null);
  const [initializationError, setInitializationError] = useState<string | null>(
    null
  );
  const [isInitializing, setIsInitializing] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/admin/login");
    }
  }, [loading, authUser, router]);

  // Initialize Stream client and call
  useEffect(() => {
    if (loading || !authUser || isInitializing || client) return;

    const initializeStream = async () => {
      setIsInitializing(true);
      setInitializationError(null);

      try {
        // Request permissions
        await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setPermissionsGranted(true);

        // Get Stream token
        const { success, data, error } = await createStreamToken(
          authUser._id,
          "admin"
        );
        if (!success) throw new Error(error || "Failed to create stream token");

        const token = data;
        const user: User = {
          id: authUser._id,
          name: authUser._id,
          image: "/assets/images/logos/dtc.png",
        };

        // Initialize Stream client
        const clientInstance = new StreamVideoClient({ apiKey, user, token });
        const callInstance = clientInstance.call("livestream", "sunday-mass");

        await callInstance.join();
        setClient(clientInstance);
        setCall(callInstance);
      } catch (err: any) {
        console.error("Error initializing livestream:", err);
        if (err.message?.includes("Permission denied")) {
          setPermissionsGranted(false);
          setInitializationError(
            "Camera and microphone access required for livestreaming"
          );
        } else if (err.message?.includes("role")) {
          setInitializationError(
            "Insufficient permissions to create livestream. Contact administrator."
          );
        } else {
          setInitializationError(
            `Failed to initialize livestream: ${err.message}`
          );
        }
      } finally {
        setIsInitializing(false);
      }
    };

    initializeStream();
  }, [loading, authUser?._id]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      const cleanup = async () => {
        try {
          if (call) await call.leave();
        } catch (err) {
          console.error(err);
        }
        try {
          if (client) await client.disconnectUser();
        } catch (err) {
          console.error(err);
        }
      };
      cleanup();
    };
  }, [call, client]);

  // ✅ Camera switching with SDK
  const { useCameraState } = useCallStateHooks();
  const { camera, selectedDevice, devices } = useCameraState();
  const { deviceList } = useDeviceList(devices, selectedDevice);

  const switchCamera = async () => {
    if (!camera || !devices.length) return;

    // Find the current device
    const currentDevice = devices.find((d) => d.deviceId === selectedDevice);

    // Detect if it's front-facing
    const isFront =
      currentDevice?.label?.toLowerCase().includes("front") ?? true;

    // Pick the opposite camera
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
    }
  };

  if (loading || isInitializing) return <LoadingScreen />;
  if (!authUser) return null;

  if (initializationError) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.errorContainer}>
          <h2>Error</h2>
          <p>{initializationError}</p>
          <button
            onClick={() => window.location.reload()}
            className={styles.retryButton}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!permissionsGranted) {
    return (
      <RequestPermissionButton onGranted={() => window.location.reload()} />
    );
  }

  if (!client || !call) return <LoadingScreen />;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.streamVideoContainer}>
        <StreamVideo client={client}>
          <StreamCall call={call}>
            <MyLiveStreamUI />
          </StreamCall>
        </StreamVideo>

        <button onClick={switchCamera} className={styles.switchCameraButton}>
          Switch Camera
        </button>
      </div>
    </div>
  );
};

export default Broadcast;
