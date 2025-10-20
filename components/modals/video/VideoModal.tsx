import { FC, ReactNode } from "react";
import styles from "../Modals.module.css";
import OutlineButton from "@/components/buttons/OutlineButton";
import Image from "next/image";

type VideoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const VideoModal: FC<VideoModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.videoModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.closeButtonWrapper} onClick={onClose}>
          <Image src="/assets/svgs/icons/x-white.svg" alt="x button" fill/>
        </div>
        <div className={styles.videoContent}>{children}</div>
      </div>
    </div>
  );
};

export default VideoModal;
