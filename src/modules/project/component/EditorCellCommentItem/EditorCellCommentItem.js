import React from 'react';
import dayjs from 'dayjs';
import styled from "styled-components";
import PropTypes from 'prop-types';

import {Flex} from "@lib/ui/Flex/Flex";
import Text from "@lib/ui/Text/Text";
import {SvgDeleteComment} from "@lib/ui/Icons/SvgDeleteComment";
import {ButtonWithImage} from "@lib/ui/ButtonWithImage/ButtonWithImage";
import {EditorCellCommentItemMessage} from "./EditorCellCommentItemMessage";


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



export const EditorCellCommentItem = ({onDelete, message, sender, createdate, id, isLoadingOnDelete, footerAlignItems}) => (
  <Wrapper
    flexDirection={'column'}
    alignItems={'flex-end'}
  >
    <EditorCellCommentItemMessage
      px={'8px'}
      py={'4px'}
      fontSize={6}
      lineHeight={8}
      color={'color7'}
      footerAlignItems={footerAlignItems}
    >
      {message}
    </EditorCellCommentItemMessage>
    <Flex width={'100%'} justifyContent={footerAlignItems}>
      <Text
        px={'8px'}
        py={'4px'}
        fontFamily={'secondary'}
        fontSize={5}
        lineHeight={7}
        color={'color4'}>
        {sender.firstname} {sender.lastname} {sender.patronymic} /{' '}
        {dayjs(createdate).format('DD.MM.YYYY HH:mm:ss')}
      </Text>
      {
        onDelete &&
        <ButtonWithImage
          fontSize={7}
          lineHeight={7}
          isLoading={isLoadingOnDelete}
          onClick={() => onDelete(id)}
          mt={'-1px'}
          variant={'empty'}>
          <SvgDeleteComment/>
        </ButtonWithImage>
      }
    </Flex>
  </Wrapper>);

EditorCellCommentItem.propTypes = {
  createdate: PropTypes.string.isRequired,
  footerAlignItems: PropTypes.oneOf(['flex-end', 'flex-start']),
  id: PropTypes.string.isRequired,
  isLoadingOnDelete: PropTypes.bool,
  message: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  sender: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    patronymic: PropTypes.string
  })
};

EditorCellCommentItem.defaultProps = {
  onDelete: null,
  footerAlignItems: 'flex-end'
};

export default EditorCellCommentItem;
