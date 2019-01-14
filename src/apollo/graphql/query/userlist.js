import { range } from '../../helpers/range';
import { useritem } from './useritem';

export const userlist = (query, props) => range(100).map(d => useritem());
