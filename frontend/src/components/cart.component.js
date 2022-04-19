import React, { Component } from "react";
import {Redirect} from 'react-router';
import UserService from "../services/user.service";
import axios from 'axios';
import { connect } from "react-redux";
import cookie from 'react-cookies';
import AuthService from "../services/auth.service";
import {Link} from 'react-router-dom';
import au from '../img/ua.jpg';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {  
      name : "",
      age: "",
      street : "",
      zip:"",
      email : "",
      phone: "",
      city : "",
      country : "",
      user:  this.props,
      photo:""
      
  };

  
  }



  componentDidMount(){
    const data={
        username: this.state.username.user.username,
        shopname: cookie.load('shopname')
    }
    axios.post('http://localhost:3001/getcartitems',data)
            .then((response) => {


                if(response.status === 200){
                    this.setState({
                items : this.state.items.concat(response.data) 
            });
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


    render(){
        //iterate over books to create a table row
        let total=this.state.items.reduce((n, {price}) => n + parseFloat(price), 0)
        

        let details = this.state.items.map(item => {
            return(
                <tr>
                     <td> <figure> {'http://localhost:3001/uploads/'+item.photo && <img src={'http://localhost:3001/uploads/'+item.photo} name={item.itemname} alt="img"/>} <figcaption>{item.itemname} </figcaption></figure></td>
                
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                </tr>
            )
        })
        //if not logged in go to login page
        let redirectVar = null;
        if(1==2){
            redirectVar = <Redirect to= "/login"/>
        }
        return(
            <div>
                {redirectVar}
                <div class="container">
                    <h2>Items</h2>



                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {details}

                            </tbody>
                        </table>
                        <div>
               <p><i>Total  ${total}</i></p> 
               <div style={{width: '10%'}}>
                    <button  onClick = {this.handleOverviewClick} class="btn btn-success" type="submit">Checkout</button>
                    </div>
                </div>
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
export default connect(mapStateToProps)(Cart);