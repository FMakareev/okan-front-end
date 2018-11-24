import React from 'react';

const ProfileLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="inherit" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0" maskType="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
      <circle cx="12" cy="12" r="12" fill="inherit" />
    </mask>
    <g mask="url(#mask0)">
      <ellipse cx="12" cy="23" rx="12" ry="9" fill="inherit" />
      <circle cx="12" cy="8" r="6.5" fill="inherit" stroke="#007FAF" strokeWidth="3" />
    </g>
  </svg>
);

const ProjectListLogo = () => (
  <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="2" cy="2" r="2" fill="inherit" />
    <rect x="6" y="1" width="18" height="2" rx="1" fill="inherit" />
    <circle cx="2" cy="8" r="2" fill="inherit" />
    <rect x="6" y="7" width="18" height="2" rx="1" fill="inherit" />
    <circle cx="2" cy="14" r="2" fill="inherit" />
    <rect x="6" y="13" width="18" height="2" rx="1" fill="inherit" />
  </svg>
);

export { ProfileLogo, ProjectListLogo };
