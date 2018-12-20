import { range } from '../../helpers/range';
import { useritem } from './userItem';

export const userlist = (query, props) => range(100).map(d => useritem());
