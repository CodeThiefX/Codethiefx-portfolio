import { useState, useEffect } from "react";
import dayjs from "dayjs";

const iOSStatusBar = () => {
  const [time, setTime] = useState(dayjs().format("h:mm"));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs().format("h:mm"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-between items-center px-6 py-2 text-white text-sm font-semibold">
      {/* Left - Time */}
      <div className="w-16">{time}</div>

      {/* Center - Dynamic Island (notch area) */}
      <div className="flex-1 flex justify-center">
        <div className="w-28 h-7 bg-black rounded-full" />
      </div>

      {/* Right - Status Icons */}
      <div className="w-16 flex items-center justify-end gap-1.5">
        {/* Signal */}
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <rect x="1" y="14" width="4" height="8" rx="1" />
          <rect x="7" y="10" width="4" height="12" rx="1" />
          <rect x="13" y="6" width="4" height="16" rx="1" />
          <rect x="19" y="2" width="4" height="20" rx="1" />
        </svg>

        {/* WiFi */}
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 18c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-4.9-2.2c1.3-1.3 3-2 4.9-2s3.6.7 4.9 2l1.4-1.4C16.3 12.3 14.2 11.4 12 11.4s-4.3.9-6.3 2.4l1.4 1.4zm-2.8-2.8c2-2 4.7-3.2 7.7-3.2s5.7 1.2 7.7 3.2l1.4-1.4c-2.4-2.4-5.6-3.8-9.1-3.8s-6.7 1.4-9.1 3.8l1.4 1.4z" />
        </svg>

        {/* Battery */}
        <div className="flex items-center gap-0.5">
          <div className="w-6 h-3 border border-white rounded-sm relative">
            <div
              className="absolute inset-0.5 bg-green-500 rounded-sm"
              style={{ width: "85%" }}
            />
          </div>
          <div className="w-0.5 h-1.5 bg-white rounded-r-sm" />
        </div>
      </div>
    </div>
  );
};

export default iOSStatusBar;
