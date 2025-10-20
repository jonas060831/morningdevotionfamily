import { FC, ReactNode } from "react";
import styles from '../Modals.module.css'
import OutlineButton from "@/components/buttons/OutlineButton";

type DismissModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  buttonClassName?: "default" | "dark" | "light" | "danger" | undefined;
  buttonTitle?: string
};

const DismissModal: FC<DismissModalProps> = ({ isOpen, onClose, title, children, buttonTitle }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {title && <h2 className={styles.title}>{title}</h2>}
        <br /><br />
        <div className={styles.content}>{children}</div>
        <br /><br />

        <OutlineButton
         onClick={onClose}
        >
          {buttonTitle}
        </OutlineButton>

      </div>
    </div>
  );
};

export default DismissModal;