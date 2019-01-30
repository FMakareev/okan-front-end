import range from "../../helpers/range";
import {projectitem} from "./projectitem";

export const projectlist = (max, props) => range(max).map(d => projectitem(props));
