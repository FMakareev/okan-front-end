import PropTypes from 'prop-types';
import {UserPropTypes} from "./UserPropTypes";


export const ProjectPropTypes = PropTypes.shape({
// mongoid
  id: PropTypes.string,
// название проекта
  name: PropTypes.string,
// пользователь создавший проект
  author: UserPropTypes,
// список участников
  partners: PropTypes.arrayOf(UserPropTypes),
// код документа ОКАН
  okancode: PropTypes.string,
// код документа заказчика
  customercode: PropTypes.string,
// mongoid документа проекта
  documents: PropTypes.arrayOf(PropTypes.string),
// дата создания
  createdate: PropTypes.string,
// дата обновления
  updatedate: PropTypes.string,
// массив ревизий проекта
  revisions: PropTypes.arrayOf(PropTypes.string),
// archive or working
  status: PropTypes.string,
});
