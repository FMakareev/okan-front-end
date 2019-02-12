import React, {Component} from 'react'
import {graphql} from 'react-apollo';

/** View */
import Box from '../../../../components/Box/Box';
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';

/** Images */
import deleteIcon from '../../../../assets/image/deleteIcon.png';

/** Mutation */
import DeleteCellMutation from '../EditorCellController/DeleteCellMutation.graphql';

/** Graphql query */
import CellListQuery from '../ProjectEditor/CellListQuery.graphql';
import CellItemQuery from '../DocumentTree/CellItemQuery.graphql';
import {sortingCells} from "../../utils/sortingCells";


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
          console.log(deletecell);
          const data = store.readQuery({
            query: CellListQuery,
            variables: {
              parent: this.props.sectionid
            }
          });

          /** сортирую список ячеек по указателям, бекенд присылает этот список в разнобой */
          data.celllist = sortingCells(data.celllist);

          let cellIndex = null;

          /**
           * @desc получаем id удаляемой ячейки
           * */
          for (let i = 0; i < data.celllist.length; i++) {
            if (data.celllist[i].id === deletecell.cell.id) {
              cellIndex = i;
            }
          }

          /** если удаляемая ячейка является первой в списке */
          if (deletecell.cell.prevcell.id === deletecell.cell.parent.id) {
             /** вот эта секция нужна для того чтобы у родительской ячейки изменить указатель на дочку
              * и с помощью этого изменения оповестить навигацию и обновить у родительской ячейки в навигации поле childcell
              * это нужно для того чтобы если после удаления первой ячейки в списке детей пользователь решит добавить подраздел в парента
              * мы имели актуальную информацию о новой дочерней ячейке */
            let options = {
              query: CellItemQuery,
              variables: {
                id: deletecell.cell.parent.id
              }
            };
            const parent = store.readQuery(options);


            if (deletecell.cell.nextcell) {
              /** если поле удаляемой ячейки есть еще ячейка */
              data.celllist.splice(cellIndex, 1);
              data.celllist[0].prevcell = parent.cellitem;
              parent.cellitem.childcell = data.celllist[0];

            } else {
              /** если ячейка одна в списке */
              data.celllist = [];
              parent.cellitem.childcell = null;
            }

            store.writeQuery({...options, data: parent});
          } else {
            /**
             * @desc Если ячейка посередине списка, то меняем указатели у соседних
             * */
            if (deletecell.cell.nextcell && deletecell.cell.prevcell.id !== deletecell.cell.parent.id) {
              data.celllist[cellIndex - 1].nextcell = data.celllist[cellIndex + 1];
              data.celllist[cellIndex + 1].prevcell = data.celllist[cellIndex - 1];

            } else if (!deletecell.cell.nextcell && deletecell.cell.prevcell.id !== deletecell.cell.parent.id) {
              /**
               * @desc Если ячейка в конце списка, то меняем указатель у предыдущей
               * */
              console.log('last');
              data.celllist[cellIndex - 1].nextcell = null;
            }
            data.celllist.splice(cellIndex, 1);
          }

          store.writeQuery({
            query: CellListQuery,
            variables: {
              parent: this.props.sectionid
            },
            data
          })
        }
      })
      .then(response => {
        console.log('response', response);
        return response;
      })
      .catch(error => {
        console.log('Error saveCellContent: ', error);
        throw error;
      });
  }

  render() {
    console.log('EditorCellDelete');
    return (
      <ButtonBase
        mr={7}
        ml={4}
        p={2}
        onClick={() => this.deleteCell()}
      >
        <img src={deleteIcon} width={'13px'}/>
      </ButtonBase>
    )
  }
}

EditorCellDelete = graphql(DeleteCellMutation)(EditorCellDelete);

export default EditorCellDelete
