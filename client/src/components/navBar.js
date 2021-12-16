import React from "react";
import '../css/style.css';
import { NavLink } from "react-router-dom";

class NavBar extends React.Component{
    render(){
        return(
            <div>
                <header id="top-header">
                    <div class="container top-header-container">
                        <div>
                            <h1 onClick={()=> window.location = "/"}>2 <span className="logo-sub-text">F.E.A.T.</span></h1>
                        </div>
                        <ul>
                            <li><NavLink to="/" exact >Home</NavLink></li>
                            <li><NavLink to="/about"  exact>About</NavLink></li>
                        </ul>
                    </div>
                </header>
            </div>
        )
    }
}

export default NavBar;


