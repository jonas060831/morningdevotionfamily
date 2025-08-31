"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import SystemMessage from "./SystemMessage";

import styles from './SystemMessage.module.css'

type SystemMessageType = "success" | "error" | "info" | "loading";

type Message = {
  id: number;
  type: SystemMessageType;
  message: string;
};

type SystemMessageContextType = {
  showMessage: (message: string, type?: SystemMessageType, duration?: number) => void;
};

const SystemMessageContext = createContext<SystemMessageContextType | undefined>(undefined);

export const useSystemMessage = () => {
  const context = useContext(SystemMessageContext);
  if (!context) throw new Error("useSystemMessage must be used within SystemMessageProvider");
  return context;
};

export const SystemMessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const showMessage = useCallback(
    (message: string, type: SystemMessageType = "info", duration = 3000) => {
      const id = Date.now();
      setMessages((prev) => [...prev, { id, type, message }]);

      setTimeout(() => {
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
      }, duration);
    },
    []
  );

  return (
    <SystemMessageContext.Provider value={{ showMessage }}>
      {children}
      {/* Message container */}
      <div className={styles.container}>
        {messages.map((msg) => (
          <SystemMessage
            key={msg.id}
            type={msg.type}
            message={msg.message}
            onClose={() => setMessages((prev) => prev.filter((m) => m.id !== msg.id))}
          />
        ))}
      </div>
    </SystemMessageContext.Provider>
  );
};
