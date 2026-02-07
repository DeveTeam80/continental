import React from 'react';

const BackgroundFlower: React.FC = () => {
  return (
    <div className="w-full h-full relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white" />
      
      <svg
        width="100%"
        height="100%"
        className="w-full h-full opacity-50"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask id="mask0_intro" maskUnits="userSpaceOnUse">
          <rect width="1440" height="2700" fill="url(#paint0_linear_intro)" />
        </mask>

        <g mask="url(#mask0_intro)">
          <path
            vectorEffect="non-scaling-stroke"
            d="M1140 1322.42V1060.26M1140 1060.26C1140 1210.29 1029.82 1308.32 918.654 1392.37C831.277 1458.43 720 1571.64 720 1687..."
            stroke="url(#paint1_linear_intro)"
            strokeWidth="1"
          />
        </g>

        <defs>
          <linearGradient id="paint0_linear_intro" x1="720" y1="0" x2="720" y2="2700">
            <stop offset="0" stopOpacity="0" />
            <stop offset="0.06" stopColor="#ca8c19" />
            <stop offset="0.13" stopOpacity="0" />
            <stop offset="0.19" stopColor="#ca8c19" />
            <stop offset="1" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="paint1_linear_intro" x1="300" y1="290.5" x2="1140" y2="290.5">
            <stop offset="0" stopColor="#ca8c19" stopOpacity="0" />
            <stop offset="0.5" stopColor="#ca8c19" />
            <stop offset="1" stopColor="#ca8c19" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default BackgroundFlower;
