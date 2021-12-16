import React from "react";
import '../css/style.css';
import { NavLink } from "react-router-dom";

class SideBar extends React.Component{
    render(){
               
        return(
            <div>
                <aside id="sidebar-links">
                    <div class="container sidebar-links-container">
                        <ul>
                            <li>
                                <a href="#"><i class="fa fa-book-open"></i> &nbsp;&nbsp; Posts</a>
                                <div class="post-links">
                                    <NavLink to="/addpost" exact>Add post</NavLink>
                                    <NavLink to="/showallpost" exact>Show all posts</NavLink>
                                </div>
                            </li>
                            <li>
                                <a href="#"><i class="fa fa-align-left"></i> &nbsp;&nbsp; Category</a>
                                <div class="post-links">
                                    <NavLink to="/addcatagory" exact>Add Catagory</NavLink>
                                    <NavLink to="/showallcatagory" exact>Show all Catagory</NavLink>
                                </div>
                            </li>
                            <li>
                                <a href="#" onClick={()=>{
                                    sessionStorage.removeItem('adminId');
                                    window.location = '/'
                            }}><i class="fa fa-sign-out-alt"></i> &nbsp;&nbsp; Logout</a>
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        )
    }
}

export default SideBar;