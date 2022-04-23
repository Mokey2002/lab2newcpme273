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
        username:  this.props,
      items : []
     
  };

  this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete (e){
    //e.stopPropagation();
    // access to e.target here
    console.log("OVERVIEW");
    console.log(e.target.value);
    console.log("OVERVIEW");

    const data={
        username: this.state.username.user.username,
        itemname:e.target.value
    }
//    axios.post('http://localhost:3001/getcartitems',data)
AuthService.deleteItemShop(data) 
            .then((response) => {


                if(response.status === 200){
 
                    console.log("Item delteds")
                } else if(response.status === 201){
                    console.log("Item not delted")
                }

            //update the state with the response data
          //  this.setState({
          //      books : this.state.books.concat(response.data) 
           // });
        });
    
}

  componentDidMount(){
    const data={
        username: this.state.username.user.username
    }
//    axios.post('http://localhost:3001/getcartitems',data)
AuthService.getCart(data) 
            .then((response) => {


                if(response.status === 200){
                    this.setState({
                items : this.state.items.concat(response.informacion) 
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

submitLogin = (e) => {
    //var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    var itemsinfo = this.state.items

    var newquan = []
    document.querySelectorAll('input').forEach( input => {
        console.log('value')
        console.log(input.value)
        console.log(Number.isInteger(parseInt(input.value)))
        console.log('value')
        if (Number.isInteger(parseInt(input.value)))
        {
            console.log('value')
            console.log(input.value)
            console.log('value')
            newquan.push(input.value); 
        }
      });

      console.log("NEWQUAN")
      console.log(newquan)
      console.log("NEWQUAN")
    //get checked check boxes 
    var checkboxes = document.getElementsByName("outOfStock");
    var arrayVal = [];
    for (var i= 0; i<checkboxes.length;i++)
     {

        if (checkboxes[i].checked === true)
        {
            arrayVal.push(checkboxes[i].value); 
        }
     }



for (var i= 0; i<itemsinfo.length;i++)
{   if(arrayVal.includes(itemsinfo[i]["itemname"])){
    itemsinfo[i]["gift"]='Yes';

    }else{
        itemsinfo[i]["gift"]='No';
    }
    itemsinfo[i]['quantity']=newquan[i];

}

console.log("cell values");
console.log(itemsinfo);
console.log(arrayVal);
console.log("cell values");
    //set the with credentials to true
  
    //make a post request with the user data
    AuthService.addShopping(itemsinfo)
    //axios.post('http://localhost:3001/getfiletered',data)
        .then(res => {
            if(res){
                console.log(res)
                window.location.href='/ShopHistory'
                this.setState({
                    authFlag : false,
                    products : (res.data)
                })
               
            }else{
                this.setState({
                    authFlag : true,
                    
                })
            }
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
                    <td><input onChange = {this.minPriceChangeHandler} type="number" class="form-control"  placeholder={item.itemname} /></td>
                    <td>         <div class="form-check">
                      <label>
                          <input type= "checkbox" name="outOfStock"  class="form-check-input" value={item.itemname} />
                         Gift
                      </label> 
              </div></td>
                    <td>
                    <div style={{width: '10%'}}>
                        <button value={item.itemname} onClick={this.handleDelete} class="btn btn-success" type="submit">Delete</button>
                    </div>


                    </td>
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
                                 
                                    <th>Gift</th>
                                    <th>Action</th>
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
                    <button  onClick = {this.submitLogin} class="btn btn-success" type="submit">Checkout</button>
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
