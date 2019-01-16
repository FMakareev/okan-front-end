import React from 'react';

export const SvgTriangle = ({fill}) => {
  return (
    <svg width="8" height="10" viewBox="0 0 8 10" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.56754 4.29149L1.28431 0.0988268C1.09856 -0.0182941 0.867908 0.00121889 0.693708 0.00121889C-0.00309088 0.00121889 2.39065e-07 0.570972 2.39065e-07 0.715316V9.28465C2.39065e-07 9.40668 -0.00305023 9.99879 0.693708 9.99879C0.867908 9.99879 1.0986 10.0182 1.28431 9.90114L7.5675 5.70852C8.08323 5.38352 7.99412 4.99998 7.99412 4.99998C7.99412 4.99998 8.08327 4.61645 7.56754 4.29149Z"
        fill={fill}
      />
    </svg>
  );
};

export default SvgTriangle;
