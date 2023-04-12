import { darken, rgb } from "polished";
import mergeDefault from "./funcs/merge_default";
const bg_primary="turquoise";
export const TurquioseTheme=mergeDefault({
   bg:{
    primary:bg_primary,
    secondary:darken(0.2,bg_primary),
   },
   link:{
    color:"#00f36e"
   }
})

export default TurquioseTheme;