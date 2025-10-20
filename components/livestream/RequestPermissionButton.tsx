import React, { useState } from "react";

export default function RequestPermissionButton({ onGranted }: { onGranted: () => void }) {
  const [error, setError] = useState<string | null>(null);

  const requestPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setError(null);
      onGranted(); // notify parent component
    } catch (err) {
      setError("Please allow camera & microphone in your browser settings.");
      console.error(err);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button
        onClick={requestPermission}
        style={{
          padding: "10px 20px",
          backgroundColor: "blue",
          color: "white",
          borderRadius: "8px",
        }}
      >
        Request Camera & Mic
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
