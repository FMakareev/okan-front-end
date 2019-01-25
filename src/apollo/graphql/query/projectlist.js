import range from "../../helpers/range";
import {projectitem} from "./projectitem";

export const projectlist = (max) => range(max).map(d => projectitem());
