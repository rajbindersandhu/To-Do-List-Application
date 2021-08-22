import React from "react";
import logo from "../Assets/Images/logo.png";

function Header(){

    return(
        <header className = "header">
            <nav>
                <img src = {logo} alt= "Logo" />
                <h1> To Do List</h1>
            </nav>
        </header>
    );

}

export default Header;