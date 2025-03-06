import { FunctionComponent } from "react";
import "./style/Footer.css";
interface FooterProps {}
 
const Footer: FunctionComponent<FooterProps> = () => {
    return ( <>
    <div className="footer">
    <h3>© 2025 Daniel Yerema. All rights reserved.</h3>
    </div>
    </> );
}
 
export default Footer;