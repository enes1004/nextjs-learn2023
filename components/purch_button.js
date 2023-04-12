import styled, { useTheme, withTheme } from "styled-components";
import { defaultTheme } from "../themes/default";
const Button=styled.button`
  font-size:1.2em;
  text-align:center;
  padding:0.7em;
  color:${props=>props?.theme?.color?.primary};
  border-color:${props => props.theme?.bg?.secondary};
  background-color:${props => props.theme?.bg?.primary};
`;

Button.defaultProps={theme:defaultTheme};

export default withTheme(function PurchButton({ children }) {
  return (
    <Button >{children}</Button>)
  ;
}
);