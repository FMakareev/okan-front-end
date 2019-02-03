import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { space } from 'styled-system';
import { connect } from 'react-redux';
import { saveBlockId } from '../../store/reducers/blocksBinding/actions';

/**View */
import Message from '../Message/Message';

import { FroalaReduxForm } from '@lib/ui/FroalaReduxForm/FroalaReduxForm';

/** Graphql */
import { graphql } from 'react-apollo';
import UnbindingCellMutation from './UnbindingCellMutation.graphql';

const Wrapper = styled.div`
  ${space};
  width: 100%;
`;

/**
 * Компонент Rich Text Editor
 * @example ./RichTextEditor.example.md
 */

export class RichTextEditor extends Component {
  static propTypes = {
    /** class */
    className: PropTypes.string,
    /** CSS: margin-bottom */
    mb: PropTypes.number,
    /** input */
    input: PropTypes.object,
    /** input */
    label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    /** input */
    type: PropTypes.string,
    /** input */
    meta: PropTypes.object,
    /** input validation */
    required: PropTypes.string,
  };

  static defaultProps = {};

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.meta.error !== this.props.meta.error ||
      nextProps.meta.active !== this.props.meta.active ||
      nextProps.meta.touched !== this.props.meta.touched ||
      nextProps.input.value !== this.props.input.value ||
      nextProps.label !== this.props.label
    ) {
      return true;
    }
    return false;
  }

  getButtonClick = (action) => {
    switch(action){
      case 'bind':
        this.storeBlockId();
        break;
      case 'unbind':
        this.unbindBlock();
        break;
      case 'copy':
        break;
    }
  }

  storeBlockId = () => {
    this.props.saveBlockId(this.props.id);
  }

  unbindBlock = () => {
    this.props.mutate({
      variables: {
        cell: this.props.id
      }
    })
      .then(({ data }) => {
        console.log('got data', data);
      }).catch((error) => {
        console.log('there was an error sending the query', error);
      });
  }

  render() {
    const { className, meta, id } = this.props;

    return (
      <Wrapper className={className}>
        <FroalaReduxForm {...this.props} handleButtonClick={(action) => {this.getButtonClick(action)}}/>
        <Message meta={meta} />
      </Wrapper>
    );
  }
}

RichTextEditor = graphql(UnbindingCellMutation)(RichTextEditor);

export default connect(
  null,
  { saveBlockId }
)(RichTextEditor)
