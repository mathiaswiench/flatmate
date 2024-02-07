import React, { useEffect, useState } from "react";
import NotificationAction from "../../reducer/notificationAction";

const NotificationCard = ({
  type,
  message,
}: {
  type: NotificationAction;
  message: string;
}) => {
  const [bgColor, setBgColor] = useState("bg-white");
  useEffect(() => {
    switch (type) {
      case NotificationAction.ALERT:
        setBgColor("bg-info");
        break;
      case NotificationAction.ERROR:
        setBgColor("bg-error");
        break;
      case NotificationAction.SUCCESS:
        setBgColor("bg-success");
        break;
      case NotificationAction.WARNING:
        setBgColor("bg-warning");
        break;
      default:
        setBgColor("bg-gray-300");
        break;
    }
  }, [type, message]);

  return (
    <div className={`card w-96 ${bgColor} text-primary-content drop-shadow-xl`}>
      <div className="card-body">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default NotificationCard;
