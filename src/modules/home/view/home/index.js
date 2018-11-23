import React from 'react';
import { Banner, Heading } from 'rebass';
import styled from 'styled-components';
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';
import ButtonWithImage from '../../../../components/ButtonWithImage/ButtonWithImage';

// import { Field, reduxForm, getFormValues, SubmissionError } from 'redux-form';
// import SelectBase from '../../../../components/SelectBase/SelectBase';

// import RichTextEditor from '../../../../components/RichTextEditor/RichTextEditor';

import Checkbox from '../../../../components/Checkbox/Checkbox';

import Table from '../../../../components/Table/Table';
import Td from '../../../../components/Table/Td';
import Th from '../../../../components/Table/Th';
import Tr from '../../../../components/Table/Tr';
import Thead from '../../../../components/Table/Thead';
import Tbody from '../../../../components/Table/Tbody';

import TextFieldBase from '../../../../components/TextFieldBase/TextFieldBase';
import { Text } from "../../../../components/Text/Text";
import { fontFamily } from "styled-system";

const Bold = styled.div`
  font-family: 'Museo Sans';
  font-weight: 300;
`;

const Usual = styled.div`
  font-family: 'Museo Sans';
  font-weight: 500;
`;

const Usual2 = styled.div`
  font-family: 'Museo Sans';
  font-weight: 700;
`;

export const HomePage = () => {
  const SvgPlay = () => (
    <svg
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="inherit"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.1351 8.58297L2.56862 0.197654C2.19712 -0.0365882 1.73582 0.00243778 1.38742 0.00243778C-0.00618175 0.00243778 4.78129e-07 1.14194 4.78129e-07 1.43063V18.5693C4.78129e-07 18.8134 -0.00610045 19.9976 1.38742 19.9976C1.73582 19.9976 2.1972 20.0364 2.56862 19.8023L15.135 11.417C16.1665 10.767 15.9882 9.99997 15.9882 9.99997C15.9882 9.99997 16.1665 9.23289 15.1351 8.58297Z"
        fill="inherit"
      />
    </svg>
  );

  const SvgFile = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="inherit" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.4039 3.30557H10.4038V2.22227C10.4038 1.8724 10.3494 1.55813 10.1282 1.34513C9.90996 1.13488 9.59058 1.0834 9.23079 1.0834H3.23079C2.87665 1.0834 2.55917 1.13546 2.33991 1.34403C2.11713 1.55597 2.05779 1.86906 2.05779 2.22227V3.55557C2.05779 3.8981 2.11845 4.20741 2.3377 4.42122C2.55506 4.63319 2.87055 4.69443 3.23079 4.69443H9.23084C9.585 4.69443 9.90247 4.64236 10.1217 4.43379C10.3445 4.22185 10.4039 3.90876 10.4039 3.55557V3.30557ZM11.75 2.10358V3.66651V3.66652V3.66653V3.66654V3.66654V3.66655V3.66656V3.66656V3.66657V3.66658V3.66659V3.66659V3.6666V3.66661V3.66662V3.66662V3.66663V3.66664V3.66664V3.66665V3.66666V11C11.75 11.4141 11.4142 11.75 10.9999 11.75H10.9943C10.8656 11.75 10.7665 11.75 10.6828 11.7446L10.4167 11.7274V11.75H10.4038V6.66665C10.4038 6.31879 10.3438 6.00761 10.1228 5.79473C9.90449 5.58443 9.58802 5.52778 9.23079 5.52778H2.76926C2.42388 5.52778 2.10722 5.5759 1.88606 5.78108C1.65982 5.99096 1.59621 6.30486 1.59621 6.66665V11.1111C1.59621 11.2353 1.60042 11.3451 1.60386 11.435C1.60494 11.463 1.60593 11.489 1.60671 11.5129C1.61027 11.6232 1.60829 11.6781 1.60148 11.7107L1.59621 11.736V11.75H1.58337V11.7338L1.3228 11.7449C1.23415 11.7486 1.12807 11.75 1 11.75C0.585814 11.75 0.25 11.4142 0.25 11V1.00006C0.25 0.585837 0.585822 0.25005 1 0.25005C1.11754 0.25005 1.22745 0.250445 1.33171 0.251137L1.58337 0.252806V0.25H9.89644L11.75 2.10358ZM8.98079 2.02778V3.75H6.25005V2.02778H8.98079ZM8.98079 6.9167V11.75H3.01926V6.9167H8.98079Z"
        fill="inherit" stroke="#848484" stroke-width="0.5"/>
    </svg>
  );

  return (
    <Banner
      color="#006699"
      bg="darken"
      backgroundImage="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=2048&q=20">
      <Heading f={[4, 5, 6, 7]}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque eius et, eum facere
        illo obcaecati quibusdam sunt! Alias sed, veritatis? Deleniti ducimus enim fuga iste
        officiis possimus ratione similique voluptatem.
        <br/>
        <ButtonBase variant="large" size={'large'} mb={4}>
          Создать проект
        </ButtonBase>
        <br/>
        <ButtonBase variant="large" size={'medium'} mb={4}>
          Создать пользователя
        </ButtonBase>
        <br/>
        <ButtonBase variant="small" size={'small'} mb={4}>
          Сохранить настройки
        </ButtonBase>
        <br/>
        <ButtonBase variant="xsmall" size={'xsmall'}>
          Поиск
        </ButtonBase>
        <br/>
        <TextFieldBase color={'#006699'} mb={4}/>
        <br/>
        <br/>

        <Text fontFamily={'main'}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab amet cumque dicta dolore eius, eos expedita fuga
          ipsa ipsam laboriosam maiores modi natus numquam odit quam soluta sunt tempore velit!

        </Text>
        <Text fontFamily={'header'}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab amet cumque dicta dolore eius, eos expedita fuga
          ipsa ipsam laboriosam maiores modi natus numquam odit quam soluta sunt tempore velit!

        </Text>
        <Text fontFamily={'headerBold'}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab amet cumque dicta dolore eius, eos expedita fuga
          ipsa ipsam laboriosam maiores modi natus numquam odit quam soluta sunt tempore velit!

        </Text>

        <br/>
        <br/>

        <ButtonWithImage
          variant="large"
          size="large"
          name="Создать пользователя"
          ml={5}
          rightIcon={SvgPlay()}
        />
        <ButtonWithImage
          variant="small"
          size="small"
          name="Создать пользователя"
          mr={2}
          leftIcon={SvgFile()}
        />
        <br/>
        <hr/>
        {/*<Field name={'description'} component={SelectBase} />
<Field name={'description'} component={RichTextEditor} />*/}
        <br/>
        <hr/>
        <Table width={'100%'}>
          <Thead>
          <Tr>
            <Th>Conference Theme</Th>
            <Th>Conference Theme</Th>
          </Tr>
          </Thead>
          <Tbody>
          <Tr>
            <Th>1</Th>
            <Th>2</Th>
          </Tr>
          </Tbody>
        </Table>
        <br/>
        <hr/>
        {SvgPlay()}
      </Heading>
      <Bold>Hello!</Bold>
      <Usual>Hello!</Usual>
      <Usual2>Hello!</Usual2>
    </Banner>
  );
};

// HomePage = reduxForm({
//   form: 'HomePage',
// })(HomePage);

export default HomePage;
