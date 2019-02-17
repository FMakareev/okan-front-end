import React from 'react';
import { SvgExport } from '@lib/ui/Icons/SvgExport';
import { SvgFolder } from '@lib/ui/Icons/SvgFolder';
import { Tr } from '@lib/ui/Table/Tr';
import { Flex } from '@lib/ui/Flex/Flex';
import { ButtonBase } from '@lib/ui/ButtonBase/ButtonBase';
import styled from 'styled-components';
import Td from '@lib/ui/Table/Td';
import { BorderColorProperty } from '@lib/styles/styleProperty/BorderColorProperty';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const TdStyled = styled(Td)`
  border-top: 2px solid;
  ${props => BorderColorProperty({ ...props, borderColor: 'color7' })}
`;

export const RevisionItem = ({ id, name, createrevisiondate, authorrevision }) => {
  return (
    <Tr>
      <TdStyled fontFamily={'primary300'} py={4}>
        {name}
      </TdStyled>
      <TdStyled fontFamily={'primary300'} py={4} textAlign={'center'}>
        {authorrevision.firstname} {authorrevision.lastname} {authorrevision.patronymic}
      </TdStyled>
      <TdStyled fontFamily={'primary300'} py={4} textAlign={'center'}>
        {dayjs(createrevisiondate).format('DD.MM.YYYY HH:mm:ss')}
      </TdStyled>
      <TdStyled fontFamily={'primary300'}>
        <Flex justifyContent={'center'}>
          <Link title={'Просмотреть ревизию документа'} to={`/app/revision-item/${id}`}>
            <ButtonBase variant={'empty'}>
              <SvgFolder />
            </ButtonBase>
          </Link>

          <ButtonBase title={'Эскпортировать ревизию документа'} variant={'empty'}>
            <SvgExport />
          </ButtonBase>
        </Flex>
      </TdStyled>
    </Tr>
  );
};

export default RevisionItem;
