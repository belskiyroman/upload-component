import React, { FC } from "react";
import cn from "classnames";

type DragAreaProps = {
  active: boolean;
};

const DragArea: FC<DragAreaProps> = ({ children, active }) => (
  <div
    className={cn("DragArea", {
      "DragArea--active": active,
    })}
  >
    {children}
  </div>
);

export default DragArea;
