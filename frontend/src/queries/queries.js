import { gql } from 'apollo-boost';

const getUser = gql`
    {
        users {
            username
            password
            city
            age
            country
            jwt
            id
        }
    }
`;
const getShop = gql`
    {
        shop {
            usernmae
            shop
            jwt
            id
        }
    }
`;
const getItems = gql`
    {
        item {
            itemname
            quantity
            description
            jwt
            id
        }
    }
`;
const getAllItems = gql`
    {
        item {
            itemname
            quantity
            description
            jwt
            id
        }
    }
`;
const getFavorites = gql`
    {
        favorites {
            itemname
            quantity
            description
            jwt
            id
        }
    }
`;
const getCart = gql`
    {
        cart {
            itemname
            quantity
            jwt
            id
        }
    }
`;




export {  getAllItems,getCart,getFavorites,getItems,getShop,getUser}