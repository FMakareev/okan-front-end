import PropTypes from 'prop-types'
import React, {PureComponent} from 'react';
import {ReactHighlightedHTML} from "../ReactHighlightedHTML/ReactHighlightedHTML";
import {Text} from "@lib/ui/Text/Text";

export class EditorCellContent extends PureComponent {

  static propTypes = {
    content: PropTypes.shape({
      content: PropTypes.string.isRequired
    }),
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    project: PropTypes.shape({
      searchCursor: PropTypes.object
    }),
    textAlign: PropTypes.oneOf(['left', 'center'])
  };

  static defaultProps = {
    textAlign: 'left',
  };

  changeContent = (content) => {
    try {
      return content ? content.replace('data-f-id="pbf"', 'style="display:none;"') : null;
    } catch (error) {
      console.error('Error changeContent: ',error);
      return null;
    }
  };

  thisCellMatchesTheSearchQuery = () => {
    try {
      const {project, id} = this.props;
      if (project.searchCursor.cell && project.searchCursor.cell.id === id) {
        return {
          searchWords: [project.searchPhrase]
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error thisCellMatchesTheSearchQuery: ',error);
      return null;
    }
  };

  render() {
    const {onClick, textAlign, content} = this.props;

    return (<Text
      className={'editor-cell_content'}
      onClick={onClick}
      fontSize={5}
      textAlign={textAlign}
      wordBreak={'break-all'}
      lineHeight={6}
      color={'color11'}
      fontFamily={'primary300'}>
      {
        content.content &&
        <ReactHighlightedHTML
          textToHighlight={this.changeContent(content.content)}
          {...this.thisCellMatchesTheSearchQuery()}
        />
      }

      {
        !content.content && (
          <Text backgroundColor={'color14'}>
            Нажмите чтобы начать редактирование раздела
          </Text>
        )
      }
    </Text>)
  }

}

export default EditorCellContent;
