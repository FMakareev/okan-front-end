import React from 'react';
import { Banner, Heading } from 'rebass';
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';
import ButtonWithImage from '../../../../components/ButtonWithImage/ButtonWithImage';
// import { Field, reduxForm, getFormValues, SubmissionError } from 'redux-form';
// import SelectBase from '../../../../components/SelectBase/SelectBase';

// import RichTextEditor from '../../../../components/RichTextEditor/RichTextEditor';

// import Play from '../../../../assets/icons/monocolor/play.monocolor.svg';
import Checkbox from '../../../../components/Checkbox/Checkbox';

import Table from '../../../../components/Table/Table';
import Td from '../../../../components/Table/Td';
import Th from '../../../../components/Table/Th';
import Tr from '../../../../components/Table/Tr';
import Thead from '../../../../components/Table/Thead';
import { Tbody } from 'react-super-responsive-table';

import TextFieldBase from '../../../../components/TextFieldBase/TextFieldBase';

export const HomePage = () => (
  <Banner
    color="#006699"
    bg="darken"
    backgroundImage="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=2048&q=20">
    <Heading f={[4, 5, 6, 7]}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque eius et, eum facere illo
      obcaecati quibusdam sunt! Alias sed, veritatis? Deleniti ducimus enim fuga iste officiis
      possimus ratione similique voluptatem.
      <br />
      <ButtonBase variant="large" size={'large'} mb={4}>
        Создать проект
      </ButtonBase>
      <br />
      <ButtonBase variant="large" size={'medium'} mb={4}>
        Создать пользователя
      </ButtonBase>
      <br />
      <ButtonBase variant="small" size={'small'} mb={4}>
        Сохранить настройки
      </ButtonBase>
      <br />
      <ButtonBase variant="xsmall" size={'xsmall'}>
        Поиск
      </ButtonBase>
      <br />
      <TextFieldBase color={'#006699'} mb={4} />
      <br />
      <ButtonWithImage variant={'large'} size={'large'} name={'Создать пользователя'} ml={5} />
      <br />
      <hr />
      {/*<Field name={'description'} component={SelectBase} />
<Field name={'description'} component={RichTextEditor} />*/}
      <br />
      <hr />
      <div>
        <Table width="100%">
          <Thead>
            <Tr>
              <Th style={{ border: '1px solid black' }}>Conference Theme</Th>
              <Th style={{ border: '1px solid black' }}>Conference Theme</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Th style={{ border: '1px solid black' }} py={2} px={2}>
                1
              </Th>
              <Th style={{ border: '1px solid black' }} py={2} px={2}>
                2
              </Th>
            </Tr>
          </Tbody>
        </Table>
      </div>
      <br />
      <hr />
    </Heading>
  </Banner>
);

// HomePage = reduxForm({
//   form: 'HomePage',
// })(HomePage);

export default HomePage;
