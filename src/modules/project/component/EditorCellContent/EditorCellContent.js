import PropTypes from 'prop-types'
import React, {PureComponent} from 'react';
import {ReactHighlightedHTML} from "../ReactHighlightedHTML/ReactHighlightedHTML";
import {Text} from "@lib/ui/Text/Text";
import {captureException} from "../../../../hocs/withSentry/withSentry";

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
      captureException(error, 'Error changeContent: ');
      return null;
    }
  };

  thisCellMatchesTheSearchQuery = () => {
    try {
      const {project, id} = this.props;
      if (project.searchResult.length) {
        return {
          searchWords: [project.searchPhrase]
        };
      } else {
        return null;
      }
    } catch (error) {
      captureException(error, 'Error thisCellMatchesTheSearchQuery: ');
      return null;
    }
  };

  render() {
    const {onClick, textAlign, content, id} = this.props;

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
          markClassName={`highlightedContentMark-${id}`}
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
