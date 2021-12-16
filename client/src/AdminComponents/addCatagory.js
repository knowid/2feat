import React from "react";
import '../css/style.css';
import { NavLink } from "react-router-dom";
import axios from "axios";

class AddCatagory extends React.Component{

    constructor(props) {
        super(props);
    
        this.state = {
            cata:'', 
            category : []
        };

        this.onChangeCata = this.onChangeCata.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeCata(e){
        e.preventDefault();
        this.setState({
            cata: e.target.value
        });
    }

    async onSubmit(e){
        e.preventDefault();
        if(this.state.cata == ''){
            alert("Empty category cannot be submitted");
            return false;
        }
        const id = sessionStorage.getItem('adminId');
        if(!id){
            return alert("Not authenticated")
        }
        await axios({
            method: "post",
            url: "/updateCategory",
            data: {
                id:id,
                category : [...this.state.category, this.state.cata]
            },
          }).then((res) => {
            if(res.data){
                window.location = "/showallpost"
            }
          })
    }

    async componentDidMount(){
        await axios.get('/getCategory').then(res => {
            const cata = res.data.category;
            console.log(cata);

            this.setState({
                category : cata
            });
        })   
    }

    render(){
        return(
            <div id="add-category">
                <div class="container add-category-container">
                    <h1 class="py-1">Add Category</h1>
                    <form onSubmit={this.onSubmit}>
                        <div class="form-group">
                            <label for="category_name">Category name </label>
                            <input type="text" name="category_name" id="category_name" 
                                placeholder="Enter a category name here..."
                                value={this.state.cata}
                                onChange={this.onChangeCata}
                            />
                        </div>
                        <input type="submit" value="Save" class="save-btn" />
                    </form>
                </div>
            </div>
        )
    }
}

export default AddCatagory;
