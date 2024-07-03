# Online Bookstore Backend

## Overview
The Online Bookstore backend is a RESTful API that provides functionalities for managing users, books, shopping carts, and orders. This backend serves as the foundation for an online bookstore, enabling user registration, authentication, book browsing, and order management.

## Functionality

### User APIs
- **User Registration**
  - **Endpoint**: `POST user/register`
  - **Description**: Allows users to create an account.
  - **Request Body**:
    ```json
    {
    "username":"Durgesh Bisen", 
    "password":"dallu", 
    "email":"webdev.durgesh@gmail.com", 
    "number":"9669931361", 
    "address":"Khandwa Madhya Pradesh", 
    "location":"Khandwa", 
    "country":"India"
    }
    ```

- **User Login**
  - **Endpoint**: `POST /user/login`
  - **Description**: Enables users to log in to their accounts.
  - **Request Body**:
    ```json
    {
    "email":"webdev.durgesh@gmail.com", 
    "password":"durgesh"
    }
    ```

    - **User Update**
  - **Endpoint**: `PUT /user/updateUser`
  - **Description**: Enables users to update information in to their accounts.
  - **Request Body**:
    <!-- note:- before this create a foldar name with tmp/my-uploads -->
    ```json
    {
    "password":"dallu", 
    "username":"Dallu Thakur", 
    "email":"webdev.durgesh@gmail.com", 
    "number":"9669931360", 
    "address":"surgaon Banjari kalkapuram", 
    "location":"Khandwa", 
    "country":"India",
    "photos":"image url string"
    }
    ```

    - **User Send OTP for user forgate password and delete account**
  - **Endpoint**: `POST /user/generateotp`
  - **Description**: Enables users to send OTP on registerd email address for delete account and forgate password.
  - **Request Body**:
    ```json
    {
    "Email":"webdev.durgesh@gmail.com"
    }
    ```

    - **User forgate password and update password**
  - **Endpoint**: `POST http://localhost:3000/user/forgotpassword`
  - **Description**: Enables users to log in to their accounts.
  - **Request Body**:
    ```json
    {
    "email":"webdev.durgesh@gmail.com",
    "otp": 5477,
    "newPassword":"dallu"
    }
    ```
    

### Book APIs
- **Browse Books**
  - **Endpoint**: `GET http://localhost:3000/book/showAllBooks`
  - **Description**: Displays a list of available books for users to browse.

- **Search Books**
  - **Endpoint**: `POST http://localhost:3000/book/searchBook`
  - **Description**: Allows users to search for books by title, author, or category.
  - **Query Parameters**: 'serialnumber', 'title', 'author', 'description', 'language'
  ```json
    {
      "searchKeyWord":"mystery set"
    }
    ```

- **View Book Details**
  - **Endpoint**: `POST http://localhost:3000/book/viewBookDetails/:serialNumber`
  - **Description**: Shows detailed information about a selected book.
  <!-- Ex - http://localhost:3000/book/viewBookDetails/8207207864 -->

### Shopping Cart APIs
- **Add to Cart**
  - **Endpoint**: `POST http://localhost:3000/cart/addToCart`
  - **Description**: Allows users to add books to their shopping cart.
  - **Request Body**:
    ```json
    {
      "user_id": 10, 
      "product_id": 8207207864, 
      "quantity":"5"
    }
    ```

- **View Cart**
  - **Endpoint**: `GET http://localhost:3000/cart/getCartInformation/:cartID`
  - **Description**: Displays the contents of the shopping cart.
  <!-- Ex -  -->

- **Remove from Cart**
  - **Endpoint**: `DELETE /api/cart/:bookId`
  - **Description**: Allows users to remove items from the shopping cart.

### Order APIs
- **Checkout**
  - **Endpoint**: `POST /api/orders`
  - **Description**: Enables users to place an order for the items in their shopping cart.
  - **Request Body**:
    ```json
    {
      "cartId": "string",
      "paymentDetails": "object"
    }
    ```

- **View Orders**
  - **Endpoint**: `GET /api/orders`
  - **Description**: Allows users to view their order history.

It looks like you've provided the description and request bodies for various admin APIs, but there are a few corrections and improvements needed to align with typical API practices and functionality. Let's refine these descriptions and request bodies based on standard conventions:

### Admin APIs

#### Admin Signup

- **Endpoint**: `POST http://localhost:3000/admin/AdminSignup`
- **Description**: Allows admin users to register into the admin panel.
- **Request Body**:
  ```json
  {
    "username": "Durgesh Bisen",
    "password": "dallu",
    "email": "webdev.durgesh@gmail.com",
    "number": "9669931361",
    "address": "Khandwa Madhya Pradesh",
    "location": "Khandwa",
    "country": "India"
  }
  ```

#### Admin Login

- **Endpoint**: `POST http://localhost:3000/admin/AdminLogin`
- **Description**: Allows admin users to log into the admin panel.
- **Request Body**:
  ```json
  {
    "email": "webdev.durgesh@gmail.com",
    "password": "dallu"
  }
  ```

#### Update Admin Profile

- **Endpoint**: `PUT http://localhost:3000/admin/UpdateAdminProfile`
- **Description**: Allows admin users to update their profile information.
- **Request Body**:
  ```json
  {
    "password": "dallu",
    "username": "Durgesh Thakur",
    "email": "webdev.durgesh@gmail.com",
    "number": "9669931361",
    "address": "Khandwa Madhya Pradesh",
    "location": "Khandwa",
    "country": "India",
    "photo:":"photo name"
  }
  ```

#### Generate OTP

- **Endpoint**: `POST http://localhost:3000/admin/GenerateOTP`
- **Description**: Generates and sends OTP to the registered email for password reset.
- **Request Body**:
  ```json
  {
    "email": "webdev.durgesh@gmail.com"
  }
  ```

#### Forgot Admin Password

- **Endpoint**: `PUT http://localhost:3000/admin/ForgotAdminPassword`
- **Description**: Allows admin users to reset their password using OTP.
- **Request Body**:
  ```json
  {
    "email": "webdev.durgesh@gmail.com",
    "otp": "123456",  // OTP received via email
    "newPassword": "newpassword"
  }
  ```

#### Delete Admin Account

- **Endpoint**: `DELETE http://localhost:3000/admin/DeleteAdminAccount`
- **Description**: Allows admin users to permanently delete their account after OTP verification.
- **Request Body**:
  ```json
  {
    "email": "webdev.durgesh@gmail.com",
    "otp": "123456"  // OTP received via email for verification
  }
  ```


- **Manage Inventory**
  - **Add Book**
    - **Endpoint**: `POST http://localhost:3000/book/uploadBook`
    - **Description**: Allows admins to add a new book to the inventory.
    - **Request Body**:
      ```json
      {
        "title": "Mystery of the Lost City",
        "author": "Jane Smith",
        "description": "A thrilling mystery set in an ancient city.",
        "publisher": "Mystery House",
        "published_date": "2019-11-22",
        "language": "English",
        "pages": 280,
        "price": 15.99,
        "quantity": 30,
        "photo": "lost_city.jpg",   
        "gallery": [
                     "city1.jpg",
                     "city2.jpg"
                   ]
      }
      ```
      <!-- NOTE - Photo And Gallery Upload imgae using form data -->

  - **Edit Book**
    - **Endpoint**: `PUT http://localhost:3000/book/updateBook/:serialNumber`
    <!-- Ex - http://localhost:3000/book/updateBook/9839291938 -->
    - **Description**: Allows admins to edit an existing book in the inventory.
    - **Request Body**:
      <!-- change Date -->
      ```json
      {
        "title": "Mystery of the Lost City",
        "author": "Jane Smith",
        "description": "A thrilling mystery set in an ancient city.",
        "publisher": "Mystery House",
        "published_date": "2019-11-23",
        "language": "English",
        "pages": 280,
        "price": 15.99,
        "quantity": 30,
        "photo": "lost_city.jpg",   
        "gallery": [
                     "city1.jpg",
                     "city2.jpg"
                   ]
      }
      ```

  - **Delete Book**
    - **Endpoint**: `DELETE http://localhost:3000/book/deleteBook/:serialNumber`
    <!-- Ex - http://localhost:3000/book/deleteBook/4841877989 -->
    - **Description**: Allows admins to delete a book from the inventory.

- **Manage Orders**
  - **View Orders**
    - **Endpoint**: `GET /api/admin/orders`
    - **Description**: Allows admins to view customer orders.





## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/durgesh966/Online-Bookstore-Back-End-API.git
    cd online-bookstore-backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up the database:
    - Ensure you have a running database instance.
    - Run the database migrations:
    ```sh
    npm run migrate
    ```

4. Start the application:
    ```sh
    npm start
    ```

5. The API will be available at `http://localhost:3000`.


## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
