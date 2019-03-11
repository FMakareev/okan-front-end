import React, { Component, Fragment } from 'react';
import Highlighter from 'react-highlight-words';
import PropTypes from 'prop-types';

export class SidebarSearch extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    try {
      return {
        searchWord: '',
        textToHighlight:
          'Compound words like an Mehrzweck-Küchenmaschine can happen in some languages.',
      }; // Передаваемый текст
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @desc метод для измнения в стейте искомое слово
   */
  updateInputValue = ev => {
    ev.preventDefault();
    this.setState({ searchWord: ev.target.value });
  };

  /**
   * @desc метод для измнения в найденного слова в предложении ( разделе )
   */
  updateTextToHighlightValue = ev => {
    ev.preventDefault();
    this.setState({ textToHighlight: ev.target.value });
  };

  /**
   * @desc метод для поиска слова с начала
   */
  findChunksAtBeginningOfWords = ({
    autoEscape,
    caseSensitive,
    sanitize,
    searchWords,
    textToHighlight,
  }) => {
    const chunks = [];
    const textLow = textToHighlight.toLowerCase();
    // Совпадение в начале каждого нового слова
    // Новое слово начинается после пробела или - (дефис)
    const sep = /[-\s]+/;

    // Совпадение в начале каждого нового слова
    // Новое слово начинается после пробела или - (дефис)
    const singleTextWords = textLow.split(sep);

    // Вполне возможно, что между словами есть несколько пробелов
    // Следовательно, мы храним индекс (позицию) каждого отдельного слова с textToHighlight
    let fromIndex = 0;
    const singleTextWordsWithPos = singleTextWords.map(s => {
      const indexInWord = textLow.indexOf(s, fromIndex);
      fromIndex = indexInWord;
      return { word: s, index: indexInWord };
    });

    // Добавить части для каждого searchWord
    searchWords.forEach(sw => {
      const swLow = sw.toLowerCase();
      // Сделайть это для каждого отдельного текстового слова
      singleTextWordsWithPos.forEach(s => {
        if (s.word.startsWith(swLow)) {
          const start = s.index;
          const end = s.index + swLow.length;
          chunks.push({ start, end });
        }
      });

      // Полное слово, включая пробелы, также должно быть обработано, например,
      // searchWord='Angela Mer' should be highlighted in 'Angela Merkel'
      if (textLow.startsWith(swLow)) {
        const start = 0;
        const end = swLow.length;
        chunks.push({ start, end });
      }
    });

    return chunks;
  };

  render() {
    return (
      <Fragment>
        <input
          type="text"
          value={this.state.searchWord}
          onChange={evt => this.updateInputValue(evt)}
        />

        <Highlighter
          searchWords={[this.state.searchWord]}
          textToHighlight={this.state.textToHighlight}
          findChunks={this.findChunksAtBeginningOfWords}>
          <div dangerouslySetInnerHTML={{ __html: this.state.textToHighlight }} />
        </Highlighter>
      </Fragment>
    );
  }
}

export default SidebarSearch;
