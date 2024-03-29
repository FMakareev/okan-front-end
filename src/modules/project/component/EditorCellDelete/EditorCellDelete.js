import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';

/** Images */
import deleteIcon from '../../../../assets/image/deleteIcon.png';

/** Mutation */
import DeleteCellMutation from '../../graphql/DeleteCellMutation.graphql';

/** Graphql query */
import CellListQuery from '../../graphql/CellListAndParentCellQuery.graphql';
import CellItemQuery from '../../graphql/CellItemQuery.graphql';

/** Redux */
import { connect } from 'react-redux';
import { error, success } from 'react-notification-system-redux';
import { BLOCK_TEXT } from '@lib/shared/blockType';
import {UnbindCellHOC} from "../../hoc/UnbindCellHOC/UnbindCellHOC";
import {captureException} from "../../../../hocs/withSentry/withSentry";

const notificationOpts = () => ({
  success: {
    title: 'Блок удален',
    position: 'tr',
    autoDismiss: 2,
  },
  error: {
    title: 'Не удалось удалить блок',
    position: 'tr',
    autoDismiss: 2,
  },
});





export class EditorCellDelete extends Component {
  constructor(props) {
    super(props);
  }

  deleteCell = (id) => {
    return this.props
      .mutate({
        variables: {
          id: id,
        },
        update: (store, { data: { deletecell } }) => {
          let data = store.readQuery({
            query: CellListQuery,
            variables: {
              parent: this.props.sectionid,
            },
          });



          /**
           * @desc получаем id удаляемой ячейки
           * */
          let cellIndex = data.celllist.findIndex(item => item.id === deletecell.cell.id);

          try {
            /** @desc обновление нумерации у таблиц и картинок */
            if (deletecell.cell.content.contenttype !== BLOCK_TEXT) {
              data.celllist = data.celllist.map((item, index) => {
                if (index > cellIndex) {
                  if (item.content.contenttype === deletecell.cell.content.contenttype) {
                    item.content.number = item.content.number - 1;
                  }
                }

                return item;
              });
            }
          } catch (error) {
            console.error('Error update content.number: ', error);
            captureException(error);
          }

          try {
            /** если удаляемая ячейка является первой в списке */
            if (deletecell.cell.prevcell.id === deletecell.cell.parent.id) {
              /** вот эта секция нужна для того чтобы у родительской ячейки изменить указатель на дочку
               * и с помощью этого изменения оповестить навигацию и обновить у родительской ячейки в навигации поле childcell
               * это нужно для того чтобы если после удаления первой ячейки в списке детей пользователь решит добавить подраздел в парента
               * мы имели актуальную информацию о новой дочерней ячейке */
              let options = {
                query: CellItemQuery,
                variables: {
                  id: deletecell.cell.parent.id,
                },
              };
              const parent = store.readQuery(options);

              if (deletecell.cell.nextcell) {
                /** если поле удаляемой ячейки есть еще ячейка */
                data.celllist.splice(cellIndex, 1);
                data.celllist[0].prevcell = parent.cellItem;
                parent.cellItem.childcell = data.celllist[0];
              } else {
                /** если ячейка одна в списке */
                data.celllist = [];
                parent.cellItem.childcell = null;
              }

              store.writeQuery({ ...options, data: parent });
            } else {
              /**
               * @desc Если ячейка посередине списка, то меняем указатели у соседних
               * */
              if (
                deletecell.cell.nextcell &&
                deletecell.cell.prevcell.id !== deletecell.cell.parent.id
              ) {
                data.celllist[cellIndex - 1].nextcell = data.celllist[cellIndex + 1];
                data.celllist[cellIndex + 1].prevcell = data.celllist[cellIndex - 1];
              } else if (
                !deletecell.cell.nextcell &&
                deletecell.cell.prevcell.id !== deletecell.cell.parent.id
              ) {
                /**
                 * @desc Если ячейка в конце списка, то меняем указатель у предыдущей
                 * */
                data.celllist[cellIndex - 1].nextcell = null;
              }
              data.celllist.splice(cellIndex, 1);
            }
          } catch (error) {
            console.error('Error update celllist: ', error);
            captureException(error);
          }

          store.writeQuery({
            query: CellListQuery,
            variables: {
              parent: this.props.sectionid,
            },
            data,
          });

          data = store.readQuery({
            query: CellItemQuery,
            variables: {
              id: this.props.sectionid,
            },
          });

          if (data.cellItem.lastChildren && data.cellItem.lastChildren.id === deletecell.cell.id) {
            if (deletecell.cell.prevcell.id !== deletecell.cell.parent.id) {
              data.cellItem.lastChildren.id = deletecell.cell.prevcell.id;
              data.cellItem.lastChildren.name = deletecell.cell.prevcell.name;
            } else {
              data.cellItem.lastChildren = null;
            }
          }

          store.writeQuery({
            query: CellItemQuery,
            variables: {
              id: this.props.sectionid,
            },
            data: data,
          });
        },
      })
      .then(response => {
        this.props.setNotificationSuccess(notificationOpts().success);

        return response;
      })
      .catch(error => {
        console.error('Error saveCellContent: ', error);
        captureException(error);
        this.props.setNotificationError(notificationOpts().error);
        throw error;
      });
  };

  onClick = async () => {
    if (confirm('Вы уверены что хотите удалить блок?')) {
      await this.props.unbindCellSubmit(this.props.id, false);
      await this.deleteCell(this.props.id);
    }
  };


  render() {
    return (
      <ButtonBase
        p={2}
        onClick={this.onClick}>
        <img src={deleteIcon} width={'13px'} />
      </ButtonBase>
    );
  }
}

EditorCellDelete.propTypes = {
  id: PropTypes.string,
  sectionid: PropTypes.string,
  setNotificationError: PropTypes.func,
  setNotificationSuccess: PropTypes.func,
};

EditorCellDelete = graphql(DeleteCellMutation)(EditorCellDelete);
EditorCellDelete = UnbindCellHOC()(EditorCellDelete);

EditorCellDelete = connect(
  null,
  dispatch => ({
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(EditorCellDelete);


export default EditorCellDelete;
