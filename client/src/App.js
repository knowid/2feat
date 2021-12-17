import React from "react";
import {BrowserRouter, Route,Routes} from "react-router-dom";

import Home from './components/home';
import NavBar from './components/navBar';
import Footer from './components/footer';
import About from './components/about';
import Login from './components/login';
import SinglePost  from "./components/singlePost";

import SideBar from './AdminComponents/sideBar';
import AddPost from './AdminComponents/addPost';
import ShowAllPost from './AdminComponents/showAllPost';
import AddCatagory from './AdminComponents/addCatagory';
import ShowAllCatagory from './AdminComponents/showAllCatagory';


class App extends React.Component{
  
  
  render(){

    return (
      <BrowserRouter>
        {sessionStorage.getItem("adminId")? <SideBar /> : <NavBar />}
        {/* <SideBar/>

        <NavBar/> */}

        <Routes>
          <Route element={<Home />} path='/' exact/>
          <Route element={<Login/>} path='/login' exact/>
          <Route element={<About/>} path='/about'/>

          <Route element={<AddPost/>} path='/addpost'/>
          <Route element={<ShowAllPost/>} path='/showallpost'/>
          <Route element={<AddCatagory/>} path='/addcatagory'/>
          <Route element={<ShowAllCatagory/>} path='/showallcatagory'/>

          <Route element={<SinglePost/>} path='/single/:id'/>  

          
        </Routes>
  
        <Footer/>
      </BrowserRouter>
    );
  }  
}

export default App;
