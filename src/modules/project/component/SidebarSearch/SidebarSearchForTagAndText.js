import React, { Component } from 'react';
import Highlighter from 'react-text-highlighter';

const SidebarSearchForTagAndText = ({ highlightedText }) => {
  return <div id="result" dangerouslySetInnerHTML={{ __html: highlightedText }} />;
};

//!important
export default Highlighter(SidebarSearchForTagAndText);
