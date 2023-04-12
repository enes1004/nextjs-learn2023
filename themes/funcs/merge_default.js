import _ from "lodash";
import defaultTheme from "../default";

export const mergeDefault= (theme)=>{return _.merge({},defaultTheme,theme)};
export default mergeDefault;