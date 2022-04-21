import React, { Component } from "react";
import axios from 'axios';
import UserService from "../services/user.service";
import cookie from 'react-cookies';
import AuthService from "../services/auth.service";
import { connect } from "react-redux";
import {Redirect} from 'react-router';
class Overview extends Component {
    constructor(props){
        super(props);
        this.handleClickFavorites = this.handleClickFavorites.bind(this);
        this.handleAddCart = this.handleAddCart.bind(this);
        this.state = {  
            items : [],
            username:this.props
        }
    }  

    handleClickFavorites (e){
        //e.stopPropagation();
        // access to e.target here
        console.log(e.target.value);

        const data={
            username: this.state.username.user.username,
            itemname:e.target.value
        }
        AuthService.addFavorites(data) 
        //axios.post('http://localhost:3001/addfavorites',data)
                .then((response) => {


                    if(response.status === 200){
                        console.log("passed favorites")
                    } else if(response.status === 201){
                        console.log("INVALID DATA  favorites")
                    }

                //update the state with the response data
              //  this.setState({
              //      books : this.state.books.concat(response.data) 
               // });
            });
    }


    handleshopclick (e){
        //e.stopPropagation();
        // access to e.target here
        console.log("OVERVIEW");
        console.log(e.target.value);
        console.log("OVERVIEW");

        let d = new Date();
        d.setTime(d.getTime() + (25*60*1000));
        document.cookie = "shopname" +'='+ e.target.value +'; Path=/;';
        window.location.href='/shop'
       // cookie.set("shopname", e.target.value, {path: "/", expires: d});
    }

    handleAddCart (e){
        //e.stopPropagation();
        // access to e.target here
        console.log(e.target.value);
        const data={
            username: this.state.username.user.username,
            itemname:e.target.value,
            price:0 
        }
    
        AuthService.addCart(data) 
       // axios.post('http://localhost:3001/addcart',data)
                .then((response) => {


                    if(response.status === 200){
                        console.log("added to cart ")
                    } else if(response.status === 201){
                        console.log("not added to cart")
                    }

                //update the state with the response data
              //  this.setState({
              //      books : this.state.books.concat(response.data) 
               // });
            });


    }

    //get the books data from backend  
    componentDidMount(){
        const data={
            username: this.state.username.user.username,
            itemname: cookie.load('itemname')
        }

        console.log("Overview");
       
        console.log(this.state.username.user.username);
        console.log(cookie.load('itemname'));
        console.log("Overview");
        AuthService.getItem(data) 
        //axios.post('http://localhost:3001/getitem',data)
                .then((response) => {


                    if(response.status === 200){
                        console.log("Overview response");
                        console.log(response)
                        console.log("Overview response");
                        this.setState({
                    items : this.state.items.concat(response.informacion) 
                });
                        console.log("passed favorites")
                    }

                //update the state with the response data
              //  this.setState({
              //      books : this.state.books.concat(response.data) 
               // });
            });
    }

  render() {


         //iterate over books to create a table row
         let details = this.state.items.map(item => {
            return(
                <tr>
                 <td> <figure> {'http://localhost:3001/uploads/'+item.photo && <img src={'http://localhost:3001/uploads/'+item.photo} name={item.itemname} alt="img"/>} <figcaption>{item.itemname} </figcaption></figure></td>
                     <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td>
                    <div style={{width: '10%'}}>
                        <button value={item.itemname} onClick={this.handleClickFavorites} class="btn btn-success" type="submit">Favorite</button>
                    </div>
                    <div style={{width: '10%'}}>
                    <button value={item.itemname} onClick = {this.handleAddCart} class="btn btn-success" type="submit">Add to cart</button>
                    </div>
                    <div style={{width: '10%'}}>
                    <button value={item.shopname} onClick = {this.handleshopclick} class="btn btn-success" type="submit">Visit Shop</button>
                    </div>
                    </td>
                </tr>
            )
        })
        //if not logged in go to login page
        let redirectVar = null;
        const { user: currentUser } = this.props;

        if (!currentUser) {
          return <Redirect to="/login" />;
        }
        return(
            <div>
                {redirectVar}
                <div class="container">
                    <h2>Overview Item</h2>

                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Sales Count</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {details}
         

                            </tbody>
                        </table>
                </div> 
            </div> 
        )
  }
}
function mapStateToProps(state) {
  const { user } = state.auth;
  console.log(user)
  return {
    user,
  };
}
export default connect(mapStateToProps)(Overview);