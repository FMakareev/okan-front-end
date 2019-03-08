import styled from "styled-components";
import BackgroundColorProperty from "@lib/styles/styleProperty/BackgroundColorProperty";
import BorderColorProperty from "@lib/styles/styleProperty/BorderColorProperty";
import Text from "@lib/ui/Text/Text";


export const EditorCellCommentItemMessage = styled(Text)`
  width: 550px;
  border: 1px solid;
  ${props => BorderColorProperty({...props, borderColor: 'color4'})};
  ${props => BackgroundColorProperty({...props, backgroundColor: 'color13'})};
  
  ${({footerAlignItems})=>{

  switch(footerAlignItems){
    case('flex-start'): {
      return `
          border-bottom-right-radius: 5px;
          border-top-right-radius: 5px;
          border-top-left-radius: 5px;
        `;
    }
    case('flex-end'): {
      return `
          border-bottom-left-radius: 5px;
          border-top-right-radius: 5px;
          border-top-left-radius: 5px;
        `;
    }
  }
}}
`;

export default EditorCellCommentItemMessage;
