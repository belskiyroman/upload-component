import React, { FC, MouseEvent } from "react";

type CloseProps = {
  onClose(e: MouseEvent<any>): void;
};

const Close: FC<CloseProps> = ({ onClose, children }) => {
  return (
    <div className="Close">
      <img
        className="Close__X"
        onClick={onClose}
        src="/img/close.svg"
        alt="close-icon"
      />
      {children}
    </div>
  );
};

export default Close;
