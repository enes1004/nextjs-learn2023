import { useContext, useEffect, useState } from 'react';
import '../styles/global.css';
import { SessionProvider } from "next-auth/react"
import {  ThemeProvider } from 'styled-components';
import { enabledThemes } from '../themes/funcs/enabledThemes';
import { fetchTheme } from '../themes/funcs/fetchTheme';
import { ThemeSelector } from '../components/theme_selector';
export const runtime = "nodejs";


export default function App({
    Component,
    pageProps: { session, ...pageProps },
  }) {
    const oldTheme=session?.userSet?.theme??enabledThemes[0];
    const [themeName, setThemeName] = useState(oldTheme);
    
    const [theme, setTheme] = useState(fetchTheme(oldTheme));
    useEffect(()=>{
      const setThemeAsync = async ()=>{
        const newTheme=await fetchTheme(themeName);
        console.log(newTheme);
        setTheme(newTheme);
      }

      setThemeAsync();
    },[themeName]);

  return (
    <ThemeProvider theme={theme}>
      <SessionProvider session={session}>
        <ThemeSelector {...{themeName,setThemeName}}/>
        <Component {...pageProps} session={session} />
      </SessionProvider>
    </ThemeProvider>
  );
}
