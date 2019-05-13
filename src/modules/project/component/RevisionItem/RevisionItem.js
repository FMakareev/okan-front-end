import PropTypes from 'prop-types';
import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { exportDocument } from '../../../../hocs/withExportDocument/withExportDocument';

/** View */
import { Tr } from '@lib/ui/Table/Tr';
import { Flex } from '@lib/ui/Flex/Flex';
import Td from '@lib/ui/Table/Td';
import { ButtonBase } from '@lib/ui/ButtonBase/ButtonBase';

/** Image */
import { SvgExport } from '@lib/ui/Icons/SvgExport';
import { SvgFolder } from '@lib/ui/Icons/SvgFolder';

/** Style css */
import { BorderColorProperty } from '@lib/styles/styleProperty/BorderColorProperty';

const TdStyled = styled(Td)`
  border-top: 2px solid;
  ${props => BorderColorProperty({ ...props, borderColor: 'color7' })}
`;

export const RevisionItem = ({ id, name, createrevisiondate, project, authorrevision }) => {
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
          <Link title={'Просмотреть ревизию документа'} to={`/app/revision-item/${project}/${id}`}>
            <ButtonBase variant={'empty'}>
              <SvgFolder />
            </ButtonBase>
          </Link>

          <ButtonBase
            title={'Эскпортировать ревизию документа'}
            onClick={event => {
              event.stopPropagation();
              exportDocument(id, name);
            }}
            variant={'empty'}>
            <SvgExport />
          </ButtonBase>
        </Flex>
      </TdStyled>
    </Tr>
  );
};

RevisionItem.propTypes = {
  authorrevision: PropTypes.object.isRequired,
  createrevisiondate: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default RevisionItem;
