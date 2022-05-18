import { gql } from 'apollo-boost';

const getUser = gql`
    {
        users {
            username
            password
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

const addCart = gql`
    {
        cart {
            itemname
            quantity
            jwt
            id
        }
    }
`;
const addFavorites = gql`
    {
        favorites {
            itemname
            jwt
            id
        }
    }
`;
const addItem = gql`
    {
        item {
            itemname
            quantity
            jwt
            id
        }
    }
`;
const addShop = gql`
    {
        shop {
            shopname
            username
            jwt
            id
        }
    }
`;
const addUser = gql`
    {
        user {
            name
            password
            id
        }
    }
`;


export {  getAllItems,getCart,addUser,getFavorites,getItems,getShop,getUser,addCart,addFavorites,addItem,addShop,addCart};