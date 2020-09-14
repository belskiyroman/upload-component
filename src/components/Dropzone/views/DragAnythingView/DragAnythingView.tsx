import cn from "classnames";
import React, { FC } from "react";

type DragAnythingViewProps = {
  active: boolean;
};

const DragAnythingView: FC<DragAnythingViewProps> = ({ active }) => (
  <div
    className={cn("DragAnythingView", {
      "DragAnythingView--active": active,
    })}
  >
    <img src="/img/drag-folder.svg" alt="folder" />
    <span className="mt-24">Drag your files here or browse to upload</span>
    <span className="mt-10 in-gray-500">
      Upload anything you want, no formats restrictions.
    </span>
  </div>
);

export default DragAnythingView;
