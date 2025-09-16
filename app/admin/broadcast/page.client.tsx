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
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { MyLiveStreamUI } from "@/components/livestream/MyLiveStreamUI";
import RequestPermissionButton from "@/components/livestream/RequestPermissionButton";
import styles from './broadcast.module.css'
import { createStreamToken } from "@/app/(server)/streamio/create-token";


type BroadcastProps = {
    streamIOAPIKey: string
}

const Broadcast:FC<BroadcastProps> = ({ streamIOAPIKey:apiKey }) => {
  const { user: authUser, loading } = useAuth();
  const router = useRouter();
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<any>(null);
  const [initializationError, setInitializationError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);

  useEffect(() => {
    // If it's not loading and there is no logged in user redirect to login screen
    if (!loading && !authUser) {
      router.push("/admin/login");
    }
  }, [loading, authUser, router]);


  // Request permissions and initialize Stream client
  useEffect(() => {
    if (loading) return; // still loading auth, exit
    if (!authUser) return; // no user, exit
    if (isInitializing) return; // already initializing, exit
    if (client) return; // already have client, exit

    const initializeStream = async () => {
      setIsInitializing(true);
      setInitializationError(null);

      try {
        // Request media permissions
        await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setPermissionsGranted(true);

        // Get token with admin role from server
        const { success, data, error } = await createStreamToken(authUser._id, "admin");
        if (!success) {
          if (error?.includes("Rate limited")) {
            throw new Error("Too many requests. Please wait a moment and try again.");
          }
          throw new Error(error || "Failed to create stream token");
        }

        const token = data;
        
        const user: User = {
          id: authUser._id,
          name: authUser._id,
          image: "/assets/images/logos/dtc.png",
        };

        // Initialize Stream client
        const clientInstance = new StreamVideoClient({ apiKey, user, token });
        
        // Create call instance
        const callInstance = clientInstance.call("livestream", "sunday-mass");
        
        // Then join the call
        await callInstance.join();

        setClient(clientInstance);
        setCall(callInstance);

      } catch (err: any) {
        console.error("Permission denied or error accessing media devices:", err);
        
        // Handle specific Stream errors
        if (err.message?.includes("Permission denied")) {
          setPermissionsGranted(false);
          setInitializationError("Camera and microphone access required for livestreaming");
        } else if (err.message?.includes("role")) {
          setInitializationError("Insufficient permissions to create livestream. Contact administrator.");
        } else {
          setInitializationError(`Failed to initialize livestream: ${err.message}`);
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
          if (call) {
            await call.leave();
            console.log("Left call successfully");
          }
        } catch (err) {
          console.error("Error leaving call:", err);
        }
        
        try {
          if (client) {
            await client.disconnectUser();
            console.log("Disconnected client successfully");
          }
        } catch (err) {
          console.error("Error disconnecting client:", err);
        }
      };
      
      cleanup();
    };
  }, []); // Empty dependency array - only run on unmount



  // Add state for camera selection
const [usingFrontCamera, setUsingFrontCamera] = useState(true);

// Function to switch camera
const switchCamera = async () => {
  if (!call) return;

  try {
    const constraints = {
      video: { facingMode: usingFrontCamera ? "environment" : "user" },
      audio: true,
    };
    
    const newStream = await navigator.mediaDevices.getUserMedia(constraints);
    const newVideoTrack = newStream.getVideoTracks()[0];

    // Replace the existing video track in the call
    await call.localParticipant.replaceTrack(
      call.localParticipant.videoTracks[0].track,
      newVideoTrack
    );

    setUsingFrontCamera(!usingFrontCamera);
  } catch (err) {
    console.error("Error switching camera:", err);
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
    return <RequestPermissionButton onGranted={() => window.location.reload()} />;
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