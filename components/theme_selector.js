import styled, { useTheme } from "styled-components";
import { enabledThemes } from "../themes/funcs/enabledThemes";
import { fetchTheme } from "../themes/funcs/fetchTheme";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import css from "styled-jsx/css";


export const OptionThemed=({onClick,value,valueName,children})=>{
    const [themeInfo,setThemeInfo]=useState(false);
    useEffect(()=>{
        const resolver= async ()=>{
            const themeInfoNew=await fetchTheme(valueName);
            setThemeInfo(themeInfoNew);
        }
        resolver();
        },[]);
    console.log(value);
    return (
        themeInfo?<MenuItem {...{value,onClick}} 
        css={css`
            &{
                background-color: ${themeInfo?.bg?.primary};
                color: ${themeInfo?.color?.primary}
            }
            &.Mui-selected {
                background-color: ${themeInfo?.bg?.primary};
                color: ${themeInfo?.color?.primary}
            }
            :hover {
                background-color: ${themeInfo?.bg?.secondary};
                color: ${themeInfo?.link?.color}
            }
        `}
        >{children}</MenuItem>:null
        );
};


export const ThemeSelector = ({setTheme})=>{
    const {  data:session, status,update } = useSession()
    console.log("session",session);
    const [themeName, setThemeName] = useState("");    
    const changeTheme = (newName)=>{
        if(newName!=themeName){
            update({themeSelected:newName});
        }
    }
    const setThemeAsync = async (newThemeName)=>{
        const newTheme=await fetchTheme(newThemeName);
        setTheme(newTheme);
    }

    useEffect(()=>{
        update();
    },[]);
    useEffect(()=>{
        const themeNow=session?.userSet?.themeSelected??enabledThemes[0];
        setThemeName(themeNow);
        console.log(themeNow)
        setThemeAsync(themeNow);
    },[session?.userSet?.themeSelected]);
 

return themeName?<FormControl>
    <Select value={themeName}>

        {enabledThemes.map(i=>
            <OptionThemed onClick={(e)=>changeTheme(i)} key={i} valueName={i} value={i}>{i}</OptionThemed>
        )}
    </Select>
    </FormControl>
    :null;
}
