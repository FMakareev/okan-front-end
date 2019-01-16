import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

/** Components */
import EditorAdditionalMenu from './EditorAdditionalMenu';
import EditorFormCreateComponent from './EditorFormCreateComponent';

/** View */
import RichTextEditor from '../../../../components/RichTextEditor/RichTextEditor';

/** Image */
import tableIcon from '../../../../assets/image/tableIcon.png';
import pictureIcon from '../../../../assets/image/pictureIcon.png';

export class EditorFormMainContent extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {};

  render() {
    return (
      <Fragment>
        <EditorFormCreateComponent nameField={'FroalaCreateText'} component={RichTextEditor} />

        <EditorFormCreateComponent
          image={tableIcon}
          nameField={'FroalaCreateTable'}
          component={RichTextEditor}
        />
        <EditorFormCreateComponent
          image={pictureIcon}
          nameField={'FroalaCreateImage'}
          component={RichTextEditor}
        />

        <EditorAdditionalMenu />
      </Fragment>
    );
  }
}

export default EditorFormMainContent;
