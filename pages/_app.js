import '../styles/global.css';
import {  ThemeProvider } from 'styled-components';
import { ThemeSelector } from '../components/theme_selector';
import { useState } from 'react';
import { SessionProvider } from 'next-auth/react';
export const runtime = "nodejs";


export default function App({
    Component,
    pageProps:pageProps,
  }) {

    const [theme,setTheme]= useState({});
    console.log('theme_in_appjs',theme);
    return (
    <SessionProvider session={{}}>
    <ThemeProvider theme={theme}>
        <ThemeSelector {...{setTheme}}/>
        <Component {...pageProps} />
    </ThemeProvider>
    </SessionProvider>
    );
}
