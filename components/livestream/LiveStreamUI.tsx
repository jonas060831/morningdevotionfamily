"use client";
import React, { useEffect, useState } from "react";
import {
  LivestreamLayout,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import VideoModal from "../modals/video/VideoModal";
import { useSystemMessage } from "../modals/notification/systemMessage/SystemMessageManager";
import generateRandomString from "@/app/utils/generateRandomString";
import { createStreamToken } from "@/app/(server)/streamio/create-token";

interface LiveStreamUIProps {
  isOpen: boolean;
  onClose: () => void;
  streamIOAPIKey: string;
}

// Regular user
const LiveStreamUI: React.FC<LiveStreamUIProps> = ({ isOpen, onClose, streamIOAPIKey: apiKey }) => {
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<any>(null);
  const { showMessage } = useSystemMessage();

  useEffect(() => {
    if (!isOpen) return; // only run when modal is open

    const initialize = async () => {
      const userId = generateRandomString(6);

      try {
        // create token for viewer
        const { success, data, error } = await createStreamToken(userId, "user");
        if (!success) {
          if (error?.includes("Rate limited")) {
            throw new Error("Too many requests. Please wait a moment and try again.");
          }
          throw new Error(error || "Failed to create stream token");
        }

        const token = data;

        const user: User = {
          id: userId,
          image: "https://i.pravatar.cc/150?img=03",
        };

        const clientInstance = new StreamVideoClient({ apiKey, user, token });
        const callInstance = clientInstance.call("livestream", "sunday-mass");

        // disable local camera/mic
        callInstance.camera.disable();
        callInstance.microphone.disable();

        await callInstance.join();

        // Check if the stream is live
        const callData = await callInstance.get();
        const isLive = !callData.call.backstage && !callData.call.ended_at;

        if (!isLive) {
          showMessage("The livestream is currently not live.", "info");
          await callInstance.leave();
          await clientInstance.disconnectUser();
          onClose();
          return;
        }

        setClient(clientInstance);
        setCall(callInstance);
      } catch (err) {
        console.error("Error joining livestream:", err);
        showMessage("Unable to join the livestream.", "info");
        onClose();
      }
    };

    initialize();

    return () => {
      const cleanup = async () => {
        if (call) await call.leave();
        if (client) await client.disconnectUser();
        setCall(null);
        setClient(null);
      };
      cleanup();
    };
  }, [isOpen, onClose, apiKey]);

  if (!isOpen) return null;

  return (
    <VideoModal isOpen={isOpen} onClose={onClose}>
      {client && call && (
        <StreamVideo client={client}>
          <StreamCall call={call}>
            <div style={{ display: "flex", gap: "1rem" }}>
              <LivestreamLayout
                showParticipantCount={true}
                showDuration={true}
                showLiveBadge={true}
              />
            </div>
          </StreamCall>
        </StreamVideo>
      )}
    </VideoModal>
  );
};

export default LiveStreamUI;
