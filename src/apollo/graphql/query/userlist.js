import { range } from '../../helpers/range';
import { useritem } from './userItem';

export const userlist = max => range(max).map(d => useritem());
