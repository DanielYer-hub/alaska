import { FunctionComponent } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface MyCardsProps {}
 
const MyCards: FunctionComponent<MyCardsProps> = () => {
    return ( <>
    <Navbar onSearch={function (_term: string): void {
            throw new Error("Function not implemented.");
        } }/>
<hr />

    <Footer/>
    </> );
}
 
export default MyCards;