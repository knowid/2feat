import React from "react";
import {BrowserRouter, Route,Switch} from "react-router-dom";

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

        <Switch>
          <Route component={Home} path='/' exact/>
          <Route component={Login} path='/login' exact/>
          <Route component={About} path='/about'/>

          <Route component={AddPost} path='/addpost'/>
          <Route component={ShowAllPost} path='/showallpost'/>
          <Route component={AddCatagory} path='/addcatagory'/>
          <Route component={ShowAllCatagory} path='/showallcatagory'/>

          <Route component={SinglePost} path='/single/:id'/>  

          
        </Switch>
  
        <Footer/>
      </BrowserRouter>
    );
  }  
}

export default App;
