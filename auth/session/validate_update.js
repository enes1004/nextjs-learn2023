import { sessionAllowedClientKeys } from "./allowed_keys";

export function validateSessionUpdate(updateDto){
    return Object.keys(updateDto).filter((i)=>sessionAllowedClientKeys.includes(i)).reduce((w,i)=>{w[i]=updateDto[i];return w},{})
}