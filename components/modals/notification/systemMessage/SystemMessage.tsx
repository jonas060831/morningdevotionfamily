import React, { FC, useEffect } from "react";
import styles from "./SystemMessage.module.css";
import Image from "next/image";

type SystemMessageProps = {
  type?: "success" | "error" | "info" | "loading";
  message: string;
  onClose: () => void;
  duration?: number;
};

const SystemMessage: FC<SystemMessageProps> = ({
  type = "info",
  message,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    
    <div className={`${styles.toast} ${styles[type]}`}>

      <span className={styles.icon}>
        {type === "success" && 
          <Image src="/assets/svgs/icons/check.svg" alt="x icon" fill />
        }
        {type === "error" && 
          <Image src="/assets/svgs/icons/x.svg" alt="x icon" fill />
        }
        {type === "info" && 
          <Image src="/assets/svgs/icons/info.svg" alt="x icon" fill />
        }
        {type === "loading" && 
          <Image src="/assets/svgs/icons/loading.svg" alt="x icon" fill />
        }
      </span>

      <p>{message}</p>
    </div>
  );
};

export default SystemMessage;
