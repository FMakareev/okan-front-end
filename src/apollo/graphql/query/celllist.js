import {celItem} from "./celItem";
import {getRandomMongoID} from "../../helpers/getRandomMongoid";
import range from "../../helpers/range";


export const celllist = () => {
  return range(5).map(() => {
    let param = {
      id: getRandomMongoID(),
      prevcell: getRandomMongoID(),
      nextcell: getRandomMongoID(),
      parent: getRandomMongoID(),
    };
    return celItem(param);
  })
};
