import React, {Component} from "react";
import styled from 'styled-components';
import {Flex} from "@lib/ui/Flex/Flex";
import {Field, Form, reduxForm} from "redux-form";
import {Box} from "@lib/ui/Box/Box";
import TextFieldWithTooltip from "@lib/ui/TextFieldWithTooltip/TextFieldWithTooltip";
import {ButtonBase} from "@lib/ui/ButtonBase/ButtonBase";


const WrapperStyled = styled(Flex)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: #ffffff;
`;

export class SidebarDocumentSearch extends Component {


  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {};
  }

  documentSearch = (value) => {
    console.log(value);
  }

  render() {
    const {handleSubmit, submitting} = this.props;
    return (
      <Form onSubmit={handleSubmit(this.documentSearch)}>
        <WrapperStyled
          py={4}
          pl={'10px'}
          pr={'12px'}
          alignItems={'center'}
        >
          <Box mt={'-6px'} height={'20px'} width={'100%'}>
            <Field
              name={'name'}
              disabled={submitting}
              component={TextFieldWithTooltip}
              placeholder={'Введите название документа...'}
              size={'xs'}
              type={'text'}
              borderRadius={'4px'}
              onBlur={handleSubmit(this.documentSearch)}
            />
          </Box>
          <Box ml={'3'} height={'20px'}>
            <ButtonBase
              type={'submit'}
              disabled={submitting}
              title={'Поиск по документам'}
              size={'small'}
              variant={'outlineGray'}
              p={'2px'}
              fontSize={'15px'}
            >
              Поиск
            </ButtonBase>
          </Box>
        </WrapperStyled>
      </Form>
    )
  }
}

SidebarDocumentSearch = reduxForm({
  form: 'SidebarDocumentSearch',
})(SidebarDocumentSearch);
export default SidebarDocumentSearch;
