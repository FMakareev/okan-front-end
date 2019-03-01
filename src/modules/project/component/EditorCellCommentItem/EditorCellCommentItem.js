import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'react-apollo';
import { withApollo } from 'react-apollo';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { success, error } from 'react-notification-system-redux';

/** View */
import Text from '@lib/ui/Text/Text';
import { Flex } from '@lib/ui/Flex/Flex';
import { ButtonBase } from '@lib/ui/ButtonBase/ButtonBase';

/** Image */
import { SvgDeleteComment } from '@lib/ui/Icons/SvgDeleteComment';

/** Graphql schema */
import UpdateCommentMutation from './UpdateCommentMutation.graphql';
import CellListQuery from '../ProjectEditor/CellListQuery.graphql';

/** Style css */
import BackgroundColorProperty from '@lib/styles/styleProperty/BackgroundColorProperty';
import BorderColorProperty from '@lib/styles/styleProperty/BorderColorProperty';

const Message = styled(Text)`
  width: 550px;
  border: 1px solid;
  ${props => BorderColorProperty({ ...props, borderColor: 'color4' })};
  ${props => BackgroundColorProperty({ ...props, backgroundColor: 'color0' })};
  border-bottom-left-radius: 5px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;

const ButtonBaseComment = styled(ButtonBase)`
  fill: #848484;

  & :active {
    fill: #df4624;
  }
`;

const Wrapper = styled(Flex)`
  position: relative;
  overflow: hidden;
  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    -webkit-filter: blur(10px);
    filter: blur(10px);
    display: block;
    background-color: white;
  }
`;

const notificationOpts = () => ({
  success: {
    title: 'Комментарий удален',
    message: 'Комментарий удален',
    position: 'tr',
    autoDismiss: 2,
  },
  error: {
    title: 'Комментарий не удален',
    message: 'Комментарий не удален',
    position: 'tr',
    autoDismiss: 2,
  },
});

export class EditorCellCommentItem extends Component {
  static propTypes = {
    cell: PropTypes.string,
    createdate: PropTypes.string,
    document: PropTypes.string,
    id: PropTypes.string,
    isdelete: PropTypes.bool,
    message: PropTypes.string,
    sender: {
      id: PropTypes.string,
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      patronymic: PropTypes.string,
    },
    updatedate: PropTypes.string,
  };

  onDelete(id) {
    return this.props[`@apollo/update`]({
      variables: { id, isdelete: true },
      update: (store, { data: { updatecomment } }) => {
        try {
          const options = {
            query: CellListQuery,
            variables: { parent: this.props.cell.parent.id },
          };
          const data = store.readQuery(options);

          data.celllist.map(item => {
            let documentIndex =
              Array.isArray(item.comments) &&
              item.comments.findIndex(items => items.id === updatecomment.comment.id);
            return item.comments && item.comments.splice(documentIndex, 1);
          });

          store.writeQuery({ ...options, data });
        } catch (error) {
          console.error('Error EditorCellCommentItem, method onDelete: ', error);
        }
      },
    })
      .then(response => {
        this.props.setNotificationSuccess(notificationOpts().success);
        return response;
      })
      .catch(error => {
        this.props.setNotificationError(notificationOpts().error);
        console.error('Error onDelete:', error);
      });
  }

  render() {
    const { commentsList } = this.props;
    return (
      commentsList &&
      commentsList.map(item => {
        return (
          <Wrapper flexDirection={'column'} alignItems={'flex-end'}>
            <Message px={'10px'} fontSize={5} lineHeight={8} color={'color7'}>
              {item.message}
            </Message>
            <Flex alignItems={'flex-end'}>
              <Text
                px={'10px'}
                fontFamily={'secondary'}
                fontSize={'14px'}
                lineHeight={'20px'}
                color={'color4'}>
                {item.sender.firstname} {item.sender.lastname} {item.sender.patronymic} /{' '}
                {dayjs(item.createdate).format('DD.MM.YYYY HH:mm:ss')}
              </Text>
              <ButtonBaseComment
                onClick={() => this.onDelete(item.id)}
                mt={'-1px'}
                variant={'empty'}>
                <SvgDeleteComment />
              </ButtonBaseComment>
            </Flex>
          </Wrapper>
        );
      })
    );
  }
}

EditorCellCommentItem = withApollo(EditorCellCommentItem);

EditorCellCommentItem = graphql(UpdateCommentMutation, {
  name: `@apollo/update`,
})(EditorCellCommentItem);

EditorCellCommentItem = connect(
  null,
  dispatch => ({
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(EditorCellCommentItem);

export default EditorCellCommentItem;
