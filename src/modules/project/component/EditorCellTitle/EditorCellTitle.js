import React from 'react';
import styled from 'styled-components';
import ReactHTMLParser from "react-html-parser";

import {Text} from "@lib/ui/Text/Text";
import {Flex} from "@lib/ui/Flex/Flex";
import {Box} from "@lib/ui/Box/Box";

const NameStyled = styled(Box)`
  p, li, ul, ol {
    margin: 0;
    padding: 0;
  }
`;
//style="display:none;"
//data-f-id="pbf"
export const EditorCellTitle = ({content, editable, onClick, contenttype}) => {
  if (content.contenttype !== contenttype || editable) return null;
  return (<Text
    onClick={() => {
      console.log('onClick: ');
      onClick();
    }}
    fontWeight={'bold'}
    fontSize={6}
    color={'color11'}
    textAlign={'center'}
  >
    <Flex
      justifyContent={'center'}
      alignItems={'flex-start'}
    >
      <Box>{content.number}. </Box>
      <NameStyled>
        {
          content.name &&
          typeof content.name === 'string' &&
          ReactHTMLParser(content.name.replace('data-f-id="pbf"', 'style="display:none;"'))
        }
      </NameStyled>
    </Flex>
  </Text>)
};

export default EditorCellTitle;
