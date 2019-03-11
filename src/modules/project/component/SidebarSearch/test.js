import React, { Component } from 'react';
import HighLighter from './SidebarSearchForTagAndText';
import './styles.css';

const ops = { caseSensitive: false, highlightClass: 'foo' };

export class App extends Component {
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

  render() {
    return (
      <Fragment>
        <input
          type="text"
          value={this.state.searchWord}
          onChange={evt => this.updateInputValue(evt)}
        />

        <HighLighter
          highlight={[this.state.searchWord]}
          text={this.state.textToHighlight}
          options={
            ops // findChunks={this.findChunksAtBeginningOfWords}
          }
        />
      </Fragment>
    );
  }
}

export default App;

// <HighLighter highlight={'1'} text={'<p>11112211</p>'} />;
