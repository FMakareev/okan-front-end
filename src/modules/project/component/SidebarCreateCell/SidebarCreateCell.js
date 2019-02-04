import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Mutation, withApollo } from 'react-apollo';
import { error, success } from 'react-notification-system-redux';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';
import Box from '../../../../components/Box/Box';

/** Image */
import { SvgSidebarAdd } from '../../../../components/Icons/SvgSidebarAdd';

/** Style css */
import { AbsoluteStyled, BoxStyled } from './SidebarCreateCellStyled';

/** Store */
import { getUserFromStore } from '../../../../store/reducers/user/selectors';

/** Constatnts */
import { BLOCK_IMAGE, BLOCK_TABLE, BLOCK_TEXT } from '@lib/shared/blockType';

/** Graphql schema */
import CreateCellMutation from './CreateCellMutation.graphql';


const notificationOpts = ({ prevcell, parent, isHead, contenttype }) => {
  let title = '';

  if (prevcell && isHead) {
    title = 'Раздел';
  } else if (isHead && parent) {
    title = 'Под раздел';
  } else if (!isHead && contenttype) {
    switch (contenttype) {
      case BLOCK_TEXT: {
        title = 'Текстовый блок';
        break;
      }
      case BLOCK_IMAGE: {
        title = 'Блок с изображением';
        break;
      }
      case BLOCK_TABLE: {
        title = 'Блок с таблицей';
        break;
      }
      default: {
        title = 'Текстовый блок';
        break;
      }
    }
  } else {
    title = 'Блок';
  }

  return {
    success: {
      title: `${title} создан.`,
      position: 'tr',
      autoDismiss: 6,
    },
    error: {
      title: `Произошла ошибка.`,
      message: `${title} не создан.`,
      position: 'tr',
      autoDismiss: 6,
    },
  };
};

/** Styles property */

export class SidebarCreateCell extends Component {
  static propTypes = {
    /** @desc id предыдущей ячейки, той после которой будет добавлен раздел, этот id будет являтся parent для подраздела */
    prevcell: PropTypes.string,
    /** @desc id ячейки родетеля это общее для ячейки prevcell и той что будет создана следом */
    parent: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      toggle: false,
    };
  }

  onToggle = event => {
    event && event.stopPropagation();
    this.setState(state => ({ toggle: !state.toggle }));
  };

  submit = (prevcell, parent, isHead, contenttype) => {
    // console.log(prevcell, parent, isHead, contenttype);
    const { setNotificationSuccess, setNotificationError } = this.props;

    const variables = {
      ...(prevcell ? { prevcell } : null),
      ...(parent ? { parent } : null),
      ...(contenttype ? { contenttype } : { contenttype: '' }),
      isHead,
    };

    this.onToggle();
    this.props.client
      .mutate({
        mutation: CreateCellMutation,
        variables,
      })
      .then(response => {
        // console.log('SidebarCreateCell response: ', response);
        if (isHead) {
          this.props.addNodeInTree(response.data.createcell.cell);
        }
        setNotificationSuccess(notificationOpts({ prevcell, parent, isHead, contenttype }).success);
      })
      .catch(error => {
        console.error('Error SidebarCreateCell: ', error);

        setNotificationError(notificationOpts({ prevcell, parent, isHead, contenttype }).error);
      });
  };

  render() {
    const {
      prevcell,
      parent,
      node: { isHead, childcell },
    } = this.props;
    const { toggle } = this.state;

    // console.log('SidebarCreateCell: ', this.props);

    return (
      <Box position={'relative'}>
        <ButtonBase
          title={'Добавить подраздел или раздел.'}
          variant={'empty'}
          onClick={this.onToggle}>
          <SvgSidebarAdd />
        </ButtonBase>

        {toggle && (
          <AbsoluteStyled
            onClick={event => {
              event.stopPropagation();
            }}
            top={'20px'}
            right={'0'}>
            {((isHead && childcell) || (isHead && !childcell) || (!isHead && childcell)) && (
              <BoxStyled
                onClick={() => {
                  this.submit(prevcell, parent, true);
                }}>
                Раздел
              </BoxStyled>
            )}

            {((isHead && !childcell) || (!isHead && childcell)) && (
              <BoxStyled
                onClick={() => {
                  this.submit(null, parent, true);
                }}>
                Подраздел
              </BoxStyled>
            )}

            {isHead && !childcell && (
              <BoxStyled
                onClick={() => {
                  this.submit(null, parent, false, BLOCK_TEXT);
                }}>
                Добавить текст
              </BoxStyled>
            )}

            {isHead && !childcell && (
              <BoxStyled
                onClick={() => {
                  this.submit(null, parent, false, BLOCK_IMAGE);
                }}>
                Добавить изображение
              </BoxStyled>
            )}

            {isHead && !childcell && (
              <BoxStyled
                onClick={() => {
                  this.submit(null, parent, false, BLOCK_TABLE);
                }}>
                Добавить таблица
              </BoxStyled>
            )}
          </AbsoluteStyled>
        )}
      </Box>
    );
  }
}

SidebarCreateCell = withApollo(SidebarCreateCell);

SidebarCreateCell = connect(
  state => ({ user: getUserFromStore(state) }),
  dispatch => ({
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(SidebarCreateCell);

export default SidebarCreateCell;
