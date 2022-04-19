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

  ShopData(username,shopname) {
    return axios.post(API_URL + "shopData",{
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

  
  AddItem(formData) {
    return axios.post(API_URL + "addItem",{
      formData
    },{ headers: authHeader(),'Content-Type': 'multipart/form-data'}).then((response) => {
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
