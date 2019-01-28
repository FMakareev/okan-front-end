import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import BorderColorProperty from "@lib/styles/styleProperty/BorderColorProperty";
import {ButtonBase} from "@lib/ui/ButtonBase/ButtonBase";
import Text from "@lib/ui/Text/Text";
import BackgroundColorProperty from "@lib/styles/styleProperty/BackgroundColorProperty";
import {Flex} from "@lib/ui/Flex/Flex";
import {SvgDeleteComment} from "@lib/ui/Icons/SvgDeleteComment";
import {graphql} from 'react-apollo';
import UpdateCommentMutation from './UpdateCommentMutation.graphql';

const Wrapper = styled(Text)`
  width: 550px;
  border: 1px solid;
  ${props => BorderColorProperty({...props, borderColor: 'color4'})};
  ${props => BackgroundColorProperty({...props, backgroundColor: 'color0'})};
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

  onDelete = (id) => {
    return this.props[`@apollo/update`]({
      variables: {
        id,
        isDelete: true,
      }
    }).then(response => {
      console.log(response);
      return response;
    }).catch(error => {
      console.error('Error onDelete:',error);
    })
  };

  render() {
    const {message, sender, createdate, id} = this.props;
    return (<Flex
      flexDirection={'column'}
      alignItems={'flex-end'}
    >
      <Wrapper px={'10px'} fontSize={5} lineHeight={8} color={'color7'}>
        {message}
      </Wrapper>
      <Flex alignItems={'flex-end'}>
        <Text px={'10px'} fontFamily={'secondary'} fontSize={'14px'} lineHeight={'20px'} color={'color4'}>
          {sender.firstname} {sender.lastname} {sender.patronymic} / {createdate}
        </Text>
        <ButtonBaseComment onClick={()=>this.onDelete(id)} mt={'-1px'} variant={'empty'}>
          <SvgDeleteComment/>
        </ButtonBaseComment>
      </Flex>
    </Flex>)
  }
}

EditorCellCommentItem = graphql(UpdateCommentMutation, {
  name: `@apollo/update`,
})(EditorCellCommentItem);

export default EditorCellCommentItem;
