import React from "react";
import '../css/style.css';
import axios from "axios";

class ShowAllCatagory extends React.Component{

    constructor(props) {
        super(props);
    
        this.state = {
            category : []
        };

        this.deleteCata = this.deleteCata.bind(this)
    }

    async  deleteCata(index) {

        const id = sessionStorage.getItem('adminId');
        if(!id){
            return alert("Not authenticated")
        }
        
        const tempCata = this.state.category;
        tempCata.splice(index,1);
       this.setState ({
           category : tempCata
       })

       await axios.post('/updateCategory',{id:id,category:this.state.category})
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


        
            const renderCatagories = () =>{
                return(
                    <>
                    {
                        this.state.category.map((cata,i=1) =>{
                            console.log(cata);
                            return(
                                <tr>
                                    <td>{i++}</td>
                                    <td>{cata}</td>
                                    <td>
                                        <a href="#" onClick={() => {this.deleteCata(i-1)}}><i class="fa fa-trash"></i></a>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </>
                   
                )
            }
        

        return(
            <div id="all-posts">
            <div class="container all-posts-container">
                <h1 class="py-1">All categories</h1>
                <table id="all-posts-table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Category name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderCatagories()}
                    </tbody>
                </table>
                <div class="load-more-btn-group">
                    <button href="#" class="load-more-btn" id="load-more">Load more</button>
                </div>
            </div>
        </div>
        )
    }
}

export default ShowAllCatagory;
