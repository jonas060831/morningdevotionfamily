import { useCall, useCallStateHooks, ParticipantView } from "@stream-io/video-react-sdk";

import styles from './MyLiveStreamUI.module.css'
import Image from "next/image";
import SwitchCameraButton from "./SwitchCameraButton";

export const MyLiveStreamUI = () => {
  const call = useCall();
  const { useIsCallLive, useLocalParticipant, useParticipantCount } = useCallStateHooks();

  const totalParticipants = useParticipantCount();
  const localParticipant = useLocalParticipant();
  const isCallLive = useIsCallLive();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        position: "relative"
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "white",
          padding: "4px 6px",
          zIndex: 10,
          position: "absolute",
          top: 10,
          left: 10,
          right: 10,
        }}
      >
        <span>Viewers: {totalParticipants - 1}</span>
        {isCallLive ? (
          <button style={{ color: "red", display: 'flex', alignItems: 'center', gap: '5px' }} onClick={() => call?.stopLive()}>
            <div style={{ position: 'relative', width: '25px', height: '25px' }}>
              <Image src="/assets/svgs/icons/stop.svg" alt="play button" fill/>
             </div>
             Stop Stream
          </button>
        ) : (
          <button style={{ color: "#04ff1e", display: 'flex', alignItems: 'center', gap: '5px' }} onClick={() => call?.goLive()}>
             <div style={{ position: 'relative', width: '25px', height: '25px' }}>
              <Image src="/assets/svgs/icons/play.svg" alt="play button" fill/>
             </div>
             Start Stream
          </button>
        )}
      </div>

      {/* Video fills container */}
      <div style={{ flex: 1, width: "100%", height: "100%" }}>
        {localParticipant && (
          <>
            <ParticipantView
             participant={localParticipant}
             ParticipantViewUI={null}
             className={styles.participantVideo}
            />
            <SwitchCameraButton />
          </>
        )}
      </div>
    </div>
  );
};
