import { FunctionComponent } from "react";
import "./style/About.css";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface AboutProps { }

const About: FunctionComponent<AboutProps> = () => {
    return (<>
        <Navbar />
        <div className="container-about">
        <h1>About Us</h1>
        <br />
        <p>The Alaska project is a web application designed for creating and managing cards. This application has two types of users: personal account, business account. Each user type has different functions and access based on their role.
            <br /><br />
            Personal account users can only view cards and add them to favorites.
            <br /><br />
            Business account users can create, edit, and delete only their own cards.
            <br /><br />
            The application includes easy navigation with features like viewing all cards, favorite cards, and creating new ones. Cards are displayed in the interface based on the selected category.
            <br />
            The project focuses on creating a simple and functional interface, making it user-friendly for users of all levels.
            <br /><br />
            Daniel Yerema — the developer of the Alaska project, integrating modern web technologies to improve the user experience.</p>
            </div>
        <Footer />  
    </>);
}

export default About;