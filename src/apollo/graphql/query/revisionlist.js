import { range } from '../../helpers/range';
import { revisionitem } from './revisionitem';

export const revisionlist = max => range(max).map(d => revisionitem());
