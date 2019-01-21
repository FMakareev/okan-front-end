import {documentitem} from "./documentItem";
import range from "../../helpers/range";

export const documentlist = (max) => range(max).map(d => documentitem());
