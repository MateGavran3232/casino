import React from "react";
import "../../styles/Toast.scss";
import useDataStore from "../../store/useDataStore";

type Toast = {
  toastType: "success" | "error" | "";
  isToastOpen: boolean;
  toastMessage: string;
};

function Toast({ toastType, isToastOpen, toastMessage }: Toast) {
  return (
    <div
      className="toast"
      style={{
        backgroundColor: toastType === "success" ? "#78c1a3" : "#f38989",
        translate: !isToastOpen ? "0rem 6rem" : "0rem 0rem",
        transition: "translate 0.25s linear",
      }}
    >
      {toastMessage}
    </div>
  );
}

export default Toast;
