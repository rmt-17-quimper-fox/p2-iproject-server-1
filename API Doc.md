## POST /admin/register

_Request Header_
not needed

_Request Body_

{
    "name": <string>,
    "username": <string>,
    "email": <string>,
    "password": <string>,
    "gender": <string>,
    "phoneNumber": <string>,
    "address": <string>,

}

_Response (201 - create)_
{
    "id": <number>,
    "name": <string>,
    "email": <string>
}


_Response (400 - Bad Request)_
{
    "message": [
        <error message>
    ]
}

_Response (500 - Internal Server Error)_
{
  "message" : 'Internal Server Error'
}




## POST /admin/login

_Request Header_
not needed

_Request Body_

{
    "email": <string>
    "password": <string>,
}

_Response (200 - ok)_
{
    "acces_token": <string>
}


_Response (401 - unauthorized)_
{
    "message": "<Invalid Email/Password>"
}


_Response (500 - Internal Server Error)_
{
  "message" : 'Internal Server Error'
}




## GET /admin/products

_Request Header_
{
    "acces_token": <string>
}

_Request Body_
not needed

_Response (200 - ok)_
[
    {
        "id": <number>,
        "name": <string>,
        "price": <number>,
        "weight": <float>,
        "imageUrl": <string>,
        "authorId": <number>,
        "categoryId": <number>,
        "Category": {
            "name": <string>,
        },
        "User": {
            "name": <number>,
            "email": <string>,
            "phoneNumber": <string>,
        }
    },
    {
        "id": <number>,
        "name": <string>,
        "price": <number>,
        "weight": <float>,
        "imageUrl": <string>,
        "authorId": <number>,
        "categoryId": <number>,
        "Category": {
            "name": <string>,
        },
        "User": {
            "name": <number>,
            "email": <string>,
            "phoneNumber": <string>,
        }
    }
]

_Response (401 - unauthorized)_
{
    "message": "You must Log In first!"
}

_Response (500 - Internal Server Error)_
{
  "message" : 'Internal Server Error'
}




## POST /admin/products

Request Header_
{
    "acces_token": <string>
}

_Request Body_
{
    "name": <string>,
    "price": <number>
    "weight": <float>,
    "imageUrl": <string>,
    "categoryId": <number>
}

_Response (201 - created)_
{
    "id": <number>,
    "name": <string>,
    "price": <number>,
    "weight": <float>,
    "imageUrl": <string>,
    "categoryId": <number>,
    "updatedAt": "<2021-10-20T17:51:11.850Z>",
    "createdAt": "<2021-10-20T17:51:11.850Z>"
}

_Response (400 - bad request)_
{
    "message": [
        "<error message>"
    ]
}

_Response (401 - unauthorized)_
{
    "message": "You must Log In first!"
}

_Response (500 - Internal Server Error)_
{
  "message" : '<Internal Server Error>'
}


## DELETE /admin/product/:id
_Request Header_
{
    "acces_token": <string>
}

_Request Body_
not needed

_Response (200 - ok)_
{
    "<message": "Product has been Deleted>"
}

_Response (400 - bad request)_
{
    "<message": "Id Not found>"
}

_Response (401 - unauthorized)_
{
    "message": "<You must Log In first!>"
}

_Response (403 - unauthorized)_
{
    "message": "<Forbidden Access>"
}

_Response (404 - NotFound)_
{
    "message": "<Products Id Not found>"
}

_Response (500 - Internal Server Error)_
{
  "message" : '<Internal Server Error>'
}


## POST /customer/login

_Request Header_
not needed

_Request Body_

{
    "email": <string>
    "password": <string>,
}

_Response (200 - ok)_
{
    "acces_token": <string>
}


_Response (401 - unauthorized)_
{
    "message": "<Invalid Email/Password>"
}


_Response (500 - Internal Server Error)_
{
  "message" : 'Internal Server Error'
}


## POST /customer/register

_Request Header_
not needed

_Request Body_

{
    "name": <string>,
    "username": <string>,
    "email": <string>,
    "password": <string>,
    "gender": <string>,
    "phoneNumber": <string>,
    "address": <string>,

}

_Response (201 - create)_
{
    "id": <number>,
    "name": <string>,
    "email": <string>
}


_Response (400 - Bad Request)_
{
    "message": [
        <error message>
    ]
}

_Response (500 - Internal Server Error)_
{
  "message" : 'Internal Server Error'
}



## GET /customer/products

_Request Header_
{
    "acces_token": <string>
}

_Request Body_
not needed

_Response (200 - ok)_
[
    {
        "id": <number>,
        "name": <string>,
        "price": <number>,
        "weight": <float>,
        "imageUrl": <string>,
        "authorId": <number>,
        "categoryId": <number>,
    },
    {
        "id": <number>,
        "name": <string>,
        "price": <number>,
        "weight": <float>,
        "imageUrl": <string>,
        "authorId": <number>,
        "categoryId": <number>,
    }
]

_Response (401 - unauthorized)_
{
    "message": "You must Log In first!"
}

_Response (500 - Internal Server Error)_
{
  "message" : 'Internal Server Error'
}

## POST /customer/order/customer/:id

_Request Header_
{
    "acces_token": <string>
}

_Request Body_
not needed

_Response (201 - created)_
{
    "userId": <number>,
    "productId": <number>,
    "updatedAt": "2021-10-20T19:07:56.625Z",
    "createdAt": "2021-10-20T19:07:56.625Z"
}

_Response (401 - unauthorized)_
{
    "message": "You must Log In first!"
}

_Response (404 - NotFound)_
{
    "message": "Product Id Not Found"
}
_Response (500 - Internal Server Error)_
{
  "message" : 'Internal Server Error'
}

## GET  order/customer/cart

_Request Header_
{
    "acces_token": <string>
}

_Request Body_
not needed

_Response (200 - ok)_
[
    {
        "id": <number>,
        "name": <string>,
        "price": <number>,
        "weight": <float>,
        "imageUrl": <string>,
        "authorId": <number>,
        "categoryId": <number>,
        "Category": {
            "name": <string>,
        },
        "User": {
            "name": <number>,
            "email": <string>,
            "phoneNumber": <string>,
        }
    },
    {
        "id": <number>,
        "name": <string>,
        "price": <number>,
        "weight": <float>,
        "imageUrl": <string>,
        "authorId": <number>,
        "categoryId": <number>,
        "Category": {
            "name": <string>,
        },
        "User": {
            "name": <number>,
            "email": <string>,
            "phoneNumber": <string>,
        }
    }
]

_Response (401 - unauthorized)_
{
    "message": "You must Log In first!"
}

_Response (500 - Internal Server Error)_
{
  "message" : 'Internal Server Error'
}

## GET  /order/customer/:cartId

_Request Header_
{
    "acces_token": <string>
}

_Request Body_
not needed

_Response (200 - ok)_
{
    "productId": <number>,
    "userId": <number>,
    "Product": {
        "name": <string>,
        "price": <number>,
        "weight": <number>,
        "imageUrl": <string>,
        "Category": {
            "name": <string>,
        },
        "User": {
            "name": <string>,
            "email": <string>,
            "phoneNumber": <string>,
        }
    }
}

_Response (401 - unauthorized)_
{
    "message": "You must Log In first!"
}

_Response (403 - Forbiden)_
{
    "message": "can't access"
}

_Response (404 - Not Found)_
{
    "message": "Cart Not Found"
}

_Response (500 - Internal Server Error)_
{
  "message" : 'Internal Server Error'
}

## GET     /order/customer/:cartId

_Request Header_
{
    "acces_token": <string>
}

_Request Body_
not needed

_Response (200 - ok)_
{
    "message": "Succes Remove from Cart"
}

_Response (401 - unauthorized)_
{
    "message": "You must Log In first!"
}

_Response (403 - Forbiden)_
{
    "message": "can't access"
}

_Response (404 - Not Found)_
{
    "message": "Cart Not Found"
}

_Response (500 - Internal Server Error)_
{
  "message" : 'Internal Server Error'
}




