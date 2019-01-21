import { range } from '../../helpers/range';
import { useritem } from './useritem';

export const userlist = (max) => range(max).map(d => useritem());
