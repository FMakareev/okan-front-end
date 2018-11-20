import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTranslate, getActiveLanguage, getLanguages } from 'react-localize-redux';
import { changeTranslate } from '../../store/reducers/localization/actions';
import { Store } from '../../store';

class LanguageSwitcher extends Component {
  static propTypes = {
    setActiveLanguage: PropTypes.func,
    currentLanguage: PropTypes.string,
    languages: PropTypes.shape({
      code: PropTypes.string,
    }),
  };

  static defaultProps = {
    setActiveLanguage: null,
    currentLanguage: null,
    languages: null,
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {};
  }

  render() {
    const { languages, setActiveLanguage, currentLanguage } = this.props;
    return (
      <ul>
        <li>{currentLanguage}</li>
        <li>
          <ul>
            {languages.map(language => (
              <li key={language.code}>
                <button onClick={() => setActiveLanguage(language.code)}>{language.code}</button>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    );
  }
}

export default connect(
  state => ({
    languages: getLanguages(state.locale),
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code,
  }),
  dispatch => ({
    setActiveLanguage: value => {
      dispatch(changeTranslate(Store.getState(), value));
    },
  }),
)(LanguageSwitcher);
