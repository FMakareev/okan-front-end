import { range } from '../../helpers/range';
import { revisionitem } from './revisionitem';
import {documentitem} from "./documentItem";

export const revisionList = max => range(max).map(d => documentitem());
