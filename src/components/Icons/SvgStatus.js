import React from 'react';

export const SvgStatus = (fill, stroke) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.25 5C0.25 2.37665 2.37665 0.25 5 0.25H15C17.6234 0.25 19.75 2.37665 19.75 5V15C19.75 17.6234 17.6234 19.75 15 19.75H5C2.37665 19.75 0.25 17.6234 0.25 15V5Z"
        fill="white"
        stroke="#848484"
        stroke-width="0.5"
      />

      <circle cx="10" cy="10" r="5" fill={fill} />
      <path
        d="M0.25 5C0.25 2.37665 2.37665 0.25 5 0.25H15C17.6234 0.25 19.75 2.37665 19.75 5V15C19.75 17.6234 17.6234 19.75 15 19.75H5C2.37665 19.75 0.25 17.6234 0.25 15V5Z"
        fill={stroke}
        stroke="#848484"
        stroke-width="0.5"
      />

      <circle cx="10" cy="10" r="5" fill={fill} />
    </svg>
  );
};
