import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Field, reduxForm, Form } from 'redux-form';
import { Absolute } from 'rebass';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';
import Flex from '../../../../components/Flex/Flex';
import Box from '../../../../components/Box/Box';
import TextAreaBase from '../../../../components/TextAreaBase/TextAreaBase';

/** Image */
import { SvgDeleteComment } from '../../../../components/Icons/SvgDeleteComment';

/** HOC */
import RenderOpenWindow from '../../../../utils/helpers/RenderOpenWindow';

/** Styles property */
import BorderColorProperty from '../../../../styles/styleProperty/BorderColorProperty';
import BorderRadiusProperty from '../../../../styles/styleProperty/BorderRadiusProperty';
import FontSizeProperty from '../../../../styles/styleProperty/FontSizeProperty';
import LineHeightProperty from '../../../../styles/styleProperty/LineHeightProperty';
import BackgroundColorProperty from '../../../../styles/styleProperty/BackgroundColorProperty';

const FlexStyled = styled(Flex)`
  position: relative;
  bottom: 5px;
`;

const ButtonBaseStyled = styled(ButtonBase)`
  height: 16px;
  z-index: 11;
`;

const ButtonBaseComment = styled(ButtonBase)`
  fill: #848484;

  & :active {
    fill: #df4624;
  }
`;

const Div = styled(Flex)`
  width: 0;
  height: 0;
  position: absolute;
  z-index: 2;
  top: 14px;
  left: 22%;
  transform: rotate(270deg);
  border-style: solid;
  border-width: 0px 5px 7px 0;
  border-color: transparent #df4624 transparent transparent;
`;

const FormStyled = styled(Form)`
  width: 250px;
  border: 1px solid;
  ${props => BorderColorProperty({ ...props, borderColor: 'color4' })};
  ${props => BackgroundColorProperty({ ...props, backgroundColor: 'color0' })};
  border-bottom-left-radius: 5px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;

export let EditorCellCommentButton = props => {
  const { handleClick, isOpen, handleSubmit } = props;

  const RenderComment = (
    <Absolute zIndex={1} right={'10px'} top={'10px'}>
      <FormStyled onSubmit={handleSubmit}>
        <Field name={'EditorCellCommentButton'} component={TextAreaBase} />
      </FormStyled>

      <ButtonBaseComment variant={'empty'}>{SvgDeleteComment()}</ButtonBaseComment>
    </Absolute>
  );

  return (
    <Box position={'relative'} zIndex={11}>
      <ButtonBaseStyled
        btnComment={'newComment'}
        color={'color0'}
        fontSize={6}
        lineHeight={5}
        position={'relative'}
        borderRadius={'4px'}
        onClick={handleClick}>
        <FlexStyled alignItems={'center'}>...</FlexStyled>
        <Div />
      </ButtonBaseStyled>

      {isOpen && RenderComment}
    </Box>
  );
};

EditorCellCommentButton.propTypes = {
  /**function for managements components*/
  handleClick: PropTypes.func,
  /** func submit for Form */
  handleSubmit: PropTypes.func,
  /** open window */
  isOpen: PropTypes.bool,
};

EditorCellCommentButton.defaultProps = {
  handleClick: () => {},
  handleSubmit: () => {},
  isOpen: false,
};

EditorCellCommentButton = reduxForm({
  form: 'EditorCellCommentButton',
})(EditorCellCommentButton);

export default RenderOpenWindow(EditorCellCommentButton);
