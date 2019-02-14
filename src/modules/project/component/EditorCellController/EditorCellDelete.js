import React, { Component } from 'react'
import { graphql } from 'react-apollo';

/** View */
import Box from '../../../../components/Box/Box';
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';

/** Images */
import deleteIcon from '../../../../assets/image/deleteIcon.png';

/** Mutation */
import DeleteCellMutation from '../EditorCellController/DeleteCellMutation.graphql';

/** Celllist query */
import CellListQuery from '../ProjectEditor/CellListQuery.graphql';
import CellItemQuery from '../DocumentTree/CellItemQuery.graphql';

/** Redux */
import { connect } from 'react-redux';
import { error, success } from 'react-notification-system-redux';

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

    deleteCell = () => {
        return this.props
        .mutate({
            variables: {
                id: this.props.id
            },
            update: (store, {data: {deletecell}}) => {

                let data = store.readQuery({
                  query: CellListQuery,
                  variables: {
                    parent: this.props.sectionid
                  }
                });

                var cellInd = null;

                /**
                 * @desc получаем id удаляемой ячейки
                 * */
                for (var i = 0; i < data.celllist.length; i++) {
                    if (data.celllist[i].id == deletecell.cell.id) {
                        cellInd = i;
                    }
                }

                /**
                 * @desc Если ячейка посередине списка, то меняем указатели у соседних
                 * */
                if (deletecell.cell.nextcell && deletecell.cell.prevcell.id != deletecell.cell.parent.id) {
                    data.celllist[cellInd - 1].nextcell.id = data.celllist[cellInd + 1].id;
                    data.celllist[cellInd + 1].prevcell.id = data.celllist[cellInd - 1].id;
                }

                /**
                 * @desc Если ячейка в конце списка, то меняем указатель у предыдущей
                 * */
                if (!deletecell.cell.nextcell && deletecell.cell.prevcell.id != deletecell.cell.parent.id) {
                    console.log('last')
                    data.celllist[cellInd - 1].nextcell = null;
                }

                /**
                 * @desc Если ячейка в начале списка, то меняем указатель у следующей
                 * */
                if (deletecell.cell.nextcell && deletecell.cell.prevcell.id == deletecell.cell.parent.id) {
                    console.log('first')
                    data.celllist[cellInd + 1].prevcell = null;
                }

                /**
                 * @desc Удаляем ячейку из массива и записываем результат в кэш
                 * */
                data.celllist.splice(cellInd, 1);
        
                store.writeQuery({
                  query: CellListQuery,
                  variables: {
                    parent: this.props.sectionid
                  },
                  data
                })
                console.log(this.props.sectionid)
                data = store.readQuery({
                    query: CellItemQuery,
                    variables: {
                      id: this.props.sectionid
                    }
                });
                console.log(deletecell.cell.id)
                data.cellitem.lastChildren && data.cellitem.lastChildren.id == deletecell.cell.id ? 
                data.cellitem.lastChildren = null : 
                null
                console.log(data.cellitem.lastChildren)
                
                store.writeQuery({
                    query: CellItemQuery,
                    variables: {
                      id: this.props.sectionid
                    },
                    data: data
                })

            }
        })
        .then(response => {
            console.log('response', response)
            this.props.setNotificationSuccess(notificationOpts().success);
            return response;
        })
        .catch(error => {
            console.log('Error saveCellContent: ', error);
            this.props.setNotificationError(notificationOpts().error);
            throw error;
        });
    }

    render() {
        return (
            <ButtonBase 
                mr={7}
                ml={4}
                p={2}
                onClick={()=>this.deleteCell()}
            >
                <img src={deleteIcon} width={'13px'}/>
            </ButtonBase>
        )
  }
}

EditorCellDelete = graphql(DeleteCellMutation)(EditorCellDelete);

EditorCellDelete = connect(
    null,
    dispatch => ({
      setNotificationSuccess: message => dispatch(success(message)),
      setNotificationError: message => dispatch(error(message)),
    }),
  )(EditorCellDelete);

export default EditorCellDelete
