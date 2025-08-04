import { FunctionComponent, useContext } from "react";
import { ThemeContext, ThemeContextType } from "../context/ThemeContext";

interface ColorThemeToggleProps {}
 
const ColorThemeToggle: FunctionComponent<ColorThemeToggleProps> = () => {
  const themeContext =useContext(ThemeContext) as ThemeContextType;
  const { toggleTheme } = themeContext
    return ( <>
<div className="form-check form-switch">
<input
  className="form-check-input"
  type="checkbox"
  role="switch"
  id="flexSwitchCheckDefault"
  onChange={toggleTheme}
/>
<label className="form-check-label" htmlFor="flexSwitchCheckDefault">
</label>
</div>
    </> );
}
 
export default ColorThemeToggle;