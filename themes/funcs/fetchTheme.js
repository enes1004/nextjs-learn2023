import { enabledThemes } from "./enabledThemes";

export async function fetchTheme(themeName){
    if(enabledThemes.includes(themeName)){
        return (await import("../"+themeName)).default;
    }
    return (await import("../"+enabledThemes[0]).then(mod=>mod.default));
}