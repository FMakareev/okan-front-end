import PropTypes from 'prop-types'
import React, {Component} from 'react';
import {findAll} from "highlight-words-core";
import ReactHTMLParser from 'react-html-parser';

export class ReactHighlightedHTML extends Component {

  static propTypes = {
    searchWords: PropTypes.arrayOf(PropTypes.string),
    textToHighlight: PropTypes.string.isRequired
  };

  static defaultProps = {
    searchWords: [],
  };

  highlightedContent = (textToHighlight, searchWords, markClassName = "highlightedContentMark") => {
    const chunks = findAll({
      searchWords: [searchWords],
      textToHighlight
    });

    return chunks
      .map(chunk => {
        const {end, highlight, start} = chunk;
        const text = textToHighlight.substr(start, end - start);
        if (highlight) {
          return `<mark class="${markClassName}" style="background-color:#ff9632;">${text}</mark>`;
        } else {
          return text;
        }
      })
      .join("");
  };

  render() {
    const {textToHighlight, searchWords,markClassName} = this.props;

    if(searchWords.length){
      return ReactHTMLParser(this.highlightedContent(textToHighlight, searchWords,markClassName));
    } else {
      return ReactHTMLParser(textToHighlight);
    }
  }

}

export default ReactHighlightedHTML;
