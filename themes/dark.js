import { darken, lighten, rgb } from "polished";

const bg_primary=rgb(10,10,10);

export const defaultTheme={
color: {
    primary: '#eee',
    secondary: '#ff8f0c',
  },
  bg:{
    primary: bg_primary,
    secondary: lighten(0.1,bg_primary),

  },
  link:{
    color: "#22a0e0",
    textDecoration: "none"
  }
}
export default defaultTheme;