import React from "react";

export const BgPattern: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}
    >
      {/* Desktop Pattern */}
      <div className="hidden md:block absolute inset-0">
        <svg
          className="w-full h-full opacity-50"
          viewBox="0 0 1440 721"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1440 721C1440 588.451 1332.55 481 1200 481M1200 481C1332.55 481 1440 373.549 1440 241M1200 481C1067.45 481 960 588.451 960 721C960 588.451 852.548 481 720 481M1200 481C1067.45 481 960 373.549 960 241M1200 481C1200 348.451 1307.45 241 1440 241M1200 481C1200 348.451 1092.55 241 960 241M1440 241C1440 108.451 1332.55 0.999971 1200 0.999971M1440 241C1307.45 241 1200 133.549 1200 0.999971M720 481C852.548 481 960 373.549 960 241M720 481C587.452 481 480 588.451 480 721C480 588.451 372.548 481 240 481M720 481C587.452 481 480 373.549 480 241M720 481C720 348.451 827.452 241 960 241M720 481C720 348.451 612.548 241 480 241M960 241C960 108.451 1067.45 0.999971 1200 0.999971M960 241C960 108.451 852.548 0.999971 720 0.999971M960 241C1092.55 241 1200 133.549 1200 0.999971M960 241C827.452 241 720 133.549 720 0.999971M240 481C372.548 481 480 373.549 480 241M240 481C107.452 481 0 588.451 0 721M240 481C107.452 481 0 373.549 0 241M240 481C240 348.451 347.452 241 480 241M240 481C240 348.451 132.548 241 0 241M480 241C480 108.451 587.452 0.999971 720 0.999971M480 241C480 108.451 372.548 0.999971 240 0.999971M480 241C612.548 241 720 133.549 720 0.999971M480 241C347.452 241 240 133.549 240 0.999971M0 241C0 108.451 107.452 0.999971 240 0.999971M0 241C132.548 241 240 133.549 240 0.999971"
            stroke="url(#pattern_gradient)"
            strokeWidth="1"
          />
          <defs>
            <linearGradient
              id="pattern_gradient"
              x1="1440"
              y1="360"
              x2="0"
              y2="360"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#0075bb" stopOpacity="0.15" />
              <stop offset="0.5" stopColor="#0075bb" stopOpacity="0.4" />
              <stop offset="1" stopColor="#0075bb" stopOpacity="0.15" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Mobile Pattern */}
      <div className="md:hidden absolute inset-0">
        <svg
          className="w-full h-full opacity-40"
          viewBox="0 0 360 181"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M360 181C360 147.863 333.137 121 300 121M300 121C333.137 121 360 94.1371 360 61M300 121C266.863 121 240 147.863 240 181C240 147.863 213.137 121 180 121M300 121C266.863 121 240 94.1371 240 61M300 121C300 87.8629 326.863 61 360 61M300 121C300 87.8629 273.137 61 240 61M360 61C360 27.8629 333.137 0.999993 300 0.999993M360 61C326.863 61 300 34.1371 300 0.999993"
            stroke="url(#mobile_gradient)"
            strokeWidth="0.5"
          />
          <defs>
            <linearGradient
              id="mobile_gradient"
              x1="360"
              y1="90"
              x2="0"
              y2="90"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#0075bb" stopOpacity="0.25" />
              <stop offset="1" stopColor="#0075bb" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};
