import { FunctionComponent, useContext } from "react";
import { ThemeContext, ThemeContextType } from "../context/ThemeContext";
import "./style/Footer.css";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
    const themeContext = useContext(ThemeContext) as ThemeContextType;
    const { theme } = themeContext;

    return (
        <div className={`footer theme-${theme}`}>
            <h3>© 2025 Daniel Yerema. All rights reserved.</h3>
        </div>
    );
};

export default Footer;
