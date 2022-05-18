
import { gql } from 'apollo-boost';


const addUser = gql`
    mutation ($username: String, $passoword: String, $age: String, $city: String, $zip:String){
        addUser(username: $username, password: $password, age: $age,city:$city,zip:$zip){
            username
            password
            city
            age
            zip

        }
    }
`;
const addItem = gql`
    mutation ($itemname: String, $quantity: String, $description: String,$price: String){
        addItem(name: $itemname, quantity: $quantity, description: $description, price:$price){
            itemname
            quantity
            description
            price

        }
    }
`;
const addShop = gql`
    mutation ($username: String, $shopname: String){
        addShop(username: $username, shopname: $shopname){
            username
            shopname
            
        }
    }
`;
const addFavorites = gql`
    mutation  ($itemname: String, $quantity: String, $description: String,$price: String){
        addFavorites (itemname: $itemname, quantity: $quantity, description: $description,price: $price){
            itemname
            quantity
            description
            price
            
        }
    }
`;
const addCart = gql`
    mutation ($itemname: String, $quantity: String, $description: String,$price: String){
        addCart(itemname: $itemname, quantity: $quantity, description: $description,price: $price){
            itemname
            quantity
            description
            price
            
        }
    }
`;
export {addUser,addFavorites,addCart,addItem,addShop};