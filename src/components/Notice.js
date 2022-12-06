import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeNotice } from "../features/Notification/NotificationSlice";

function Notice() {
  const { notice, condition } = useSelector((state) => state.notice);
  const dispatch = useDispatch();

  let color = null;
  if (condition !== "") {
    if (condition === "success") {
      color = "text-gray-600 text-semibold";
    } else if (condition === "error") {
      color = "text-red-600";
    }

    setTimeout(() => {
        dispatch(removeNotice())
    }, 5000);
  }

  if (notice !== "") {
    return (
      <div className="fixed bottom-0 right-0 bg-green-300 p-6 m-4 rounded-lg">
        <h4 className={color}>{notice}</h4>
      </div>
    );
  } else {
    return false;
  }
}

export default Notice;
