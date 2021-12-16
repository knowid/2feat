import axios from "axios";
import React from "react";
import '../css/style.css';

class Login extends React.Component{
    constructor(props){
        super(props);

        this.state = ({
            email: "",
            password: ""
        });

        this.handleEmail= this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
    }

    handleEmail(e){
        e.preventDefault();
        this.setState({
            email: e.target.value
        })
    }

    handlePassword(e){
        e.preventDefault();
        this.setState({
            password: e.target.value
        })
    }

    async handleSubmit(e){
        e.preventDefault();
        await axios.post('/loginAdmin',{
            email: this.state.email,
            password: this.state.password
        })
        .then(res =>{
            const id = res.data;
            if(id.msg){
                return alert(id.msg)
            }
            console.log(res)
            sessionStorage.setItem("adminId", id.toString());
            window.location = '/addpost'
        })
    }

    render(){
        return(
            <div id="login-form">
                <div class="container login-form-container">
                    <h1>Login</h1>
                    <form onSubmit={this.handleSubmit} >
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" onChange={this.handleEmail} name="email" id="email"/>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" onChange={this.handlePassword} name="password" id="password"/>
                        </div>
                        <input type="submit" value="Login"/>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;


