import React from 'react';
import styled from 'styled-components';
import ReactHTMLParser from 'react-html-parser';

import { Text } from '@lib/ui/Text/Text';
import { Flex } from '@lib/ui/Flex/Flex';
import { Box } from '@lib/ui/Box/Box';
import {BLOCK_IMAGE, BLOCK_TABLE} from "@lib/shared/blockType";

const NameStyled = styled(Box)`
  p,
  li,
  ul,
  ol {
    margin: 0;
    padding: 0;
  }
`;
// TODO рефакторинг: с 32 по 43 строки оптимизировать
export const EditorCellTitle = ({ content, editable, onClick, contenttype, parentLetterNumber, textAlign = 'center' }) => {
  if (content.contenttype !== contenttype || editable) return null;
  return (
    <Text
      onClick={() => {
        onClick();
      }}
      fontWeight={'bold'}
      fontSize={6}
      color={'color11'}
      width={'100%'}
      textAlign={textAlign}>
      <Flex width={'100%'} justifyContent={textAlign} alignItems={'flex-start'}>
        {
          parentLetterNumber &&
          (<Box>
            {contenttype === BLOCK_TABLE && 'Таблица '}{contenttype === BLOCK_IMAGE && 'Рисунок '}{parentLetterNumber} {content.number}.
          </Box>)
        }
        {
          !parentLetterNumber &&
          (<Box>
            {contenttype === BLOCK_TABLE && 'Таблица '}{contenttype === BLOCK_IMAGE && 'Рисунок '}{content.number}.
          </Box>)
        }
        <NameStyled>
          {content.name &&
            typeof content.name === 'string' &&
            ReactHTMLParser(content.name.replace('data-f-id="pbf"', 'style="display:none;"'))}
        </NameStyled>
      </Flex>
    </Text>
  );
};

export default EditorCellTitle;
