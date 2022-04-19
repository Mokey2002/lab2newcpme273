import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "../actions/auth";
import { Redirect } from 'react-router-dom';
import AuthService from "../services/auth.service";
import cookie from 'react-cookies';
import 'bootstrap/dist/css/bootstrap.min.css';
class ShopRegister extends Component {
  
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeShopName = this.onChangeShopName.bind(this);


    this.state = {
      shopname : "",
      username:  this.props, //"", //cookie.load('cookie'),
      successful: false,
      validid: false
    };
  }
  onChangeShopName(e) {
    this.setState({
      shopname: e.target.value,
    });
  }



  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });

  
    AuthService.registerShop(this.state.username.user.username, this.state.shopname) 
        .then((data) => {
          console.log("data")
          console.log(data)
          document.cookie = "shopname" +'='+this.state.shopname +'; Path=/;';

          console.log("data")
          this.setState({
            successful: true,
          });
        })
        .catch((error) => {
          console.log("error")
          console.log(error)
          console.log("error")
          this.setState({
            successful: false,
            validid: true
          });
        });
    
  }

  render() {

    const { user: currentUser } = this.props;
    let {successful} = this.state;
    let {validid} = this.state;
    let success = null;
 
    let invalidID;

    if(successful == true){
      console.log("indside suecc")
      success = <Redirect to = "/shop"/>
  }
    if(validid ==true){
      invalidID =    <div class="alert alert-danger" role="alert">
      <td>"Shop name already taken"</td> 
  </div>
  }
    return (
      
      <div className="col-md-12">
        {invalidID}
        {success}
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />
                    <h2><strong>{currentUser.username}</strong> Name your Shop</h2>
<form class="form-inline">
  <div class="form-group ">
    <label for="inputPassword2" class="sr-only">Password</label>
    <input type="search"  onChange = {this.onChangeShopName}  class="form-control rounded" placeholder="Shop Name" aria-label="Search" aria-describedby="search-addon" />
  </div>
  <button type="submit" onClick = {this.handleRegister} class="btn btn-primary mb-2">Check</button>
</form>

        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  const { user } = state.auth;
  console.log(user)
  return {
    user,
  };
}
export default connect(mapStateToProps)(ShopRegister);
