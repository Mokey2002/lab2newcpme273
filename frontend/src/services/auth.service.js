import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  registerShop(username,shopname) {
    return axios.post(API_URL + "signupShop",{
      username,
      shopname
    },{ headers: authHeader()}).then((response) => {
      if (response.data.status == 201) {
        localStorage.setItem("shopname", JSON.stringify(response.data.shopname));
      }

      return response.data;
    });
  }

  shopItems(username,shopname) {
    return axios.post(API_URL + "getShopItems",{
      username,
      shopname
    },{ headers: authHeader()}).then((response) => {
      if (response.data.status == 201) {
                         //localStorage.setItem("shopname", JSON.stringify(response.data.shopname));
        return response.data;
      }
      else if(response.data.status == 200){
        return response.data;
      }

      return response.data;
    });
  }
  getAllShop() {
    return axios.post(API_URL + "getAllShop",{
    
    }).then((response) => {
      if (response.data.status == 201) {
                         //localStorage.setItem("shopname", JSON.stringify(response.data.shopname));
        return response.data;
      }
      else if(response.data.status == 200){
        return response.data;
      }

      return response.data;
    });
  }

  getItem(itemname) {
    return axios.post(API_URL + "getItem",{itemname
    
    },{ headers: authHeader()}).then((response) => {
      if (response.data.status == 201) {
                         //localStorage.setItem("shopname", JSON.stringify(response.data.shopname));
        return response.data;
      }
      else if(response.data.status == 200){
        return response.data;
      }

      return response.data;
    });
  }
  
  addCart(itemname) {
    return axios.post(API_URL + "addCart",{itemname
    
    },{ headers: authHeader()}).then((response) => {
      if (response.data.status == 201) {
                         //localStorage.setItem("shopname", JSON.stringify(response.data.shopname));
        return response.data;
      }
      else if(response.data.status == 200){
        return response.data;
      }

      return response.data;
    });
  }
  addFavorites(itemname) {
    return axios.post(API_URL + "addFavorites",{itemname
    
    },{ headers: authHeader()}).then((response) => {
      if (response.data.status == 201) {
                         //localStorage.setItem("shopname", JSON.stringify(response.data.shopname));
        return response.data;
      }
      else if(response.data.status == 200){
        return response.data;
      }

      return response.data;
    });
  }

  getFavorites(itemname) {
    return axios.post(API_URL + "getFavorites",{itemname
    
    },{ headers: authHeader()}).then((response) => {
      if (response.data.status == 201) {
                         //localStorage.setItem("shopname", JSON.stringify(response.data.shopname));
        return response.data;
      }
      else if(response.data.status == 200){
        return response.data;
      }

      return response.data;
    });
  }

  getCart(itemname) {
    return axios.post(API_URL + "getCart",{itemname
    
    },{ headers: authHeader()}).then((response) => {
      if (response.data.status == 201) {
                         //localStorage.setItem("shopname", JSON.stringify(response.data.shopname));
        return response.data;
      }
      else if(response.data.status == 200){
        return response.data;
      }

      return response.data;
    });
  }

  AddItem(informacion) {
    console.log("item information")
    console.log(informacion)
 
    console.log("item information")
    return axios.post(API_URL + "addItem",
    informacion
    ,{ headers: {'Content-Type':'multipart/form-data'}}).then((response) => {
      if (response.data.status == 201) {
        console.log("201")
                         //localStorage.setItem("shopname", JSON.stringify(response.data.shopname));
        return response.data;
      }
      else if(response.data.status == 200){
        console.log("200")
        return response.data;
      }

      return response.data;
    });
  }


  register(username, email, password,age,zip,city,street) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      age,zip,city,street
    });
  }
}

export default new AuthService();
