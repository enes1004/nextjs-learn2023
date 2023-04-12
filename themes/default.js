import { darken, rgb } from "polished";

const bg_primary=rgb(255,255,255);

export const defaultTheme={
color: {
    primary: '#111',
    secondary: '#0070f3',
  },
  bg:{
    primary: bg_primary,
    secondary: darken(0.05,bg_primary),

  },
  link:{
    color: "#0070f3",
    textDecoration: "none"
  }
}
export default defaultTheme;