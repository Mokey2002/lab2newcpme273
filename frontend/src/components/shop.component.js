import React, { Component } from "react";

import UserService from "../services/user.service";

export default class Shop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "asdfasf"
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (

      
    
      <div class="container">
          <h2>All Items</h2>
          <br/>
              <div style={{width: '30%'}} class="form-group">
                      <input onChange = {this.termChangeHandler} type="text" class="form-control" name="term" placeholder="Search..."/>
              </div>
              <div style={{width: '30%'}}>
                  <button onClick = {this.submitLogin} class="btn btn-success" type="submit">Search</button>
              </div> 
              <br/>
              <p>Filter by Price Range</p>
              <div style={{width: '15%'}} class="form-group">
                      <input onChange = {this.minPriceChangeHandler} type="number" class="form-control" name="minPrice" placeholder="Min"/>
                      <input onChange = {this.maxPriceChangeHandler} type="number" class="form-control" name="maxPrice" placeholder="Max"/>
              </div>
              <p>Sort Products By: </p>
              <div class="form-check">
                      <label>
                          <input type= "radio" name="sortType" value="price" checked={this.state.selectedOption ==="price"}  onChange = {this.selectedOptionChangeHandler} class="form-check-input" />
                          Price
                      </label> 
              </div>
              <div class="form-check">
                      <label>
                          <input type= "radio" name="sortType" value="quantity" checked={this.state.selectedOption ==="quantity"}  onChange = {this.selectedOptionChangeHandler} class="form-check-input" />
                          Quantity
                      </label> 
              </div>
              <div class="form-check">
                      <label>
                          <input type= "radio" name="sortType" value="salesCount" checked={this.state.selectedOption ==="salesCount"}  onChange = {this.selectedOptionChangeHandler} class="form-check-input" />
                          Sales Count
                      </label> 
              </div>
              <div class="form-check">
                      <label>
                          <input type= "checkbox" name="outOfStock" checked={this.state.outOfStock}  onChange = {this.outOfStockOptionChangeHandler} class="form-check-input" />
                          Show Out of Stock Items
                      </label> 
              </div>
              
              <br/>
               <table class="table">
                  <thead>
                      <tr>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Description</th>
                          <th>Shop</th>
                          <th>Actions</th>

                      </tr>
                  </thead>
                  <tbody>
                      {/*Display the Tbale row based on data recieved*/}
                      {/*details */} 
                  </tbody>
              </table>
      </div> 
  
  /*
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
      </div>*/
    );
  }
}
