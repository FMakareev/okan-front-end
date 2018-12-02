import styled from 'styled-components';
import { space } from 'styled-system';

export const Wrapper = styled.div`
  ${space};
`;

// export const NewTextFieldDefault = styled(TextFieldDefault)`
//   border-radius: ${props => props.theme.borderRadius[0]};
//   color: ${props => {
//     if (props.meta.touched && props.meta.error) {
//       return props.theme.colors.line.color23;
//     }
//     if (props.meta.touched && !props.meta.error) {
//       return props.theme.colors.line.color22;
//     }
//     return props.theme.colors.line.color21;
//   }}!important;

//   border-bottom: 1px solid
//     ${props => {
//       if (props.meta.touched && props.meta.error) {
//         return props.theme.colors.line.color23;
//       }
//       if (props.meta.touched && !props.meta.error) {
//         return props.theme.colors.line.color22;
//       }
//       return props.theme.colors.line.color21;
//     }}!important;
// `;

// export const LabelStyled = styled(Label)`
//   color: ${props => props.theme.colors.line.color21};
// `;
