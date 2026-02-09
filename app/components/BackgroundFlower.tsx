import React from 'react';

const BackgroundFlower: React.FC = () => {
  return (
    <div className="w-full h-full relative">
      {/* 
        NOTE: Removed the white gradient overlay that was here previously.
        It was causing the "weird gradient" issue on the dark background.
      */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white" /> */}

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
            d="M1140 1322.42V1060.26M1140 1060.26C1140 1210.29 1029.82 1308.32 918.654 1392.37C831.277 1458.43 720 1571.64 720 1687M1140 1060.26V798.092M1140 798.092C1140 948.13 1029.82 1046.16 918.654 1130.21C831.277 1196.27 720 1309.48 720 1424.84M1140 798.092V535.929M720 1687C720 1571.64 608.723 1458.43 521.346 1392.37C410.178 1308.32 300 1210.29 300 1060.26M720 1687V1424.84M1140 535.929C1140 685.967 1029.82 783.997 918.654 868.044C831.277 934.104 720 1047.32 720 1162.67M1140 535.929V274.326M720 1424.84C720 1309.48 608.723 1196.27 521.346 1130.21C410.178 1046.16 300 948.13 300 798.092M720 1424.84V1162.67M1140 274.326C1140 424.364 1029.82 522.394 918.654 606.441C831.277 672.501 720 785.715 720 901.071M1140 274.326V12.1631M720 1162.67C720 1047.32 608.723 934.104 521.346 868.044C410.178 783.997 300 685.967 300 535.929M720 1162.67V901.071M1140 12.1631C1140 162.201 1029.82 260.231 918.654 344.278C831.277 410.338 720 523.552 720 638.908M1140 12.1631V-250C1140 -99.9623 1029.82 -1.93189 918.654 82.1149C831.277 148.175 720 261.389 720 376.745M720 901.071C720 785.715 608.723 672.501 521.346 606.441C410.178 522.394 300 424.364 300 274.326M720 901.071V638.908M720 638.908C720 523.552 608.723 410.338 521.346 344.278C410.178 260.231 300 162.201 300 12.1631M720 638.908V376.745M720 376.745V114.582M720 376.745C720 261.389 608.723 148.175 521.346 82.1149C410.178 -1.93189 300 -99.9623 300 -250V12.1631M918.654 -180.048C831.277 -113.988 720 -0.774235 720 114.582M720 114.582C720 -0.774235 608.723 -113.988 521.346 -180.048M300 1322.42V1060.26M300 1060.26V798.092M300 798.092V535.929M300 535.929V274.326M300 274.326V12.1631"
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
