import PropTypes from 'prop-types';
import {UserPropTypes} from "./UserPropTypes";
import {CELL_STATUS_CHANGED, CELL_STATUS_CHECKED, CELL_STATUS_NOT_CHECKED} from "@lib/shared/approvalStatus";


export const CommentPropTypes = PropTypes.shape({
  // mongoid
  id: PropTypes.string,
  // тест комментария
  message: PropTypes.string,
  // отправитель
  sender: UserPropTypes,
  // id сущности к которой привязан комментарий
  cell: PropTypes.string,
  // id документа, при создании комментария id документа добавляется автоматически
  document: PropTypes.string,
  // дата создания комментария, в формате ISO
  createdate: PropTypes.string,
  // дата обновления комментария, в формате ISO
  updatedate: PropTypes.string,
  // удален ли комментарий (?)
  isdelete: PropTypes.bool,
});

export const BlockPropTypes = PropTypes.shape({
  // mongoid
  id: PropTypes.string,
  // заголовок
  name: PropTypes.string,
  // html контент фроалы
  content: PropTypes.string,
  // номер ячейки в документе
  number: PropTypes.string,
  // тип контента: таблица, картинка, текст
  contenttype: PropTypes.string,
});

export const CellPropTypes = () => PropTypes.shape({
  // mongoid
  id: PropTypes.string,
  // имя раздела
  name: PropTypes.string,
  // статус проверки ячейки
  verify: PropTypes.string,
  // id предыдущей ячейки, оно равно id в свойстве parent если ячейка дочерняя другой ячейке и первая по счету
  prevcell: CellPropTypes(),
  // id следующей ячейки
  nextcell: CellPropTypes(),
  // id родительской ячейки
  parent: CellPropTypes(),
  // id первой дочерней ячейки, от этой ячейки далее строятся запросы на получение всех дочерних ячеек
  childcell: CellPropTypes(),
  // говорит нам является ли ячейка названием раздела, а не блоком с контентом,
  // если равно false то id в поле childCell указывает не на дочернюю категорию, а на дочерний блок с контентом
  is_head: PropTypes.bool,
  // контент раздела
  content: BlockPropTypes,
  // массив комментариев ячейки
  comment: CommentPropTypes,
  // массив связанных объектов
  pull: PropTypes.arrayOf(CellPropTypes()),
  // null, на согласовании, согласован, не согласован
  approvalstatus: PropTypes.oneOf([CELL_STATUS_CHECKED, CELL_STATUS_NOT_CHECKED, CELL_STATUS_CHANGED, null]),
});
