# Over view:

    - This Full stack application is a social media application that allows users to create, read, update, and delete posts, as well as manage user accounts. Here is a high-level overview of the application's functionalities based on the provided API endpoints:

# [Hosted_Link](https://threads-app-two-rho.vercel.app)

## General Overview

    - The application is a social platform where users can:
        - Create, update, delete, and view posts.
        - Like or unlike posts.
        - Sign up, log in, log out, and update their user profiles.
        - Search for other users and view their profiles and posts.

## Use Case Scenario

    - User Signup and Authentication:

        * A new user signs up with their details.
        * The user logs in to receive an authentication token.

    - Creating and Managing Posts:

        * The authenticated user creates a new post with a description and optional image.
        * The user can view all posts or specific posts by their ID.
        * The user can update or delete their own posts.

    - Interacting with Posts:

        * The user can like or unlike posts by their ID.

    - Profile Management:

        * The user updates their profile with new information or a profile picture.
        * The user can view other users' profiles and search for users.

    - Exploring Content:

        * The user views posts made by others and interacts with them.
        * The user views posts liked by themselves or others.

## API Templete

    - The base URL for all API endpoints is:

### BASE_URL

    - Description: Base URL for All API requests
    - https://likethreads.onrender.com

### End_Points

#### POSTS

    1) Create a post:

        - URL: `/api/posts/create`
        - Method: `POST`
        - Description: Creates a new post
        - Headers: `Authorization: Bearer <token>`
        - Request Body:
        {
            "description": "Description of post",
            "image": "Base64EncodedImageString"
        }
        - Responses:
            * `201 Created`: Post created successfully.
            * `400 Bad Request`: User and description are  required or invalid image format.
            * `401 Unauthorized`: User not authenticated or unauthorized.
            * `404 Not Found`: User not found.
            * `500 Internal Server Error`: Error message.

    2) Get a Post by ID:

        - URL: `/api/posts/:id`
        - Method: `GET`
        - Description: Retrieves a post by its ID.
        - Responses:
            * `200 OK`: Returns the post data.
            * `401 wrong post id`: Post not found.
            * `500 Internal Server Error`: Error message.

    3) Delete a Post by ID:

        - URL: `/api/posts/:id`
        - Method: `DELETE`
        - Description: Deletes a post by its ID.
        - Headers: `Authorization: Bearer <token>`
        - Responses:
            * `200 OK`: Post deleted successfully.
            * `401 Unauthorized`: Unauthorized to delete post.
            * `404 Not Found`: Post not found.
            * `500 Internal Server Error`: Error message.

    4) Update a Post by ID:

        - URL: `/api/posts/:id`
        - Method: `PUT`
        - Description: Updates a post by its ID.
        - Headers: `Authorization: Bearer <token>`
        - Request Body:
        {
            "description": "Updated Description",
            "image": "Base64EncodedImageString"
        }
        - Responses:
            * `201 OK`: Post updated successfully.
            * `400 Bad Request`: Description should be less than 400 characters.
            * `401 Unauthorized`: Unauthorized to update post.
            * `404 Not Found`: Post not found.
            * `500 Internal Server Error`: Error message.

    5) Get All Posts:

        - URL: `/api/posts/`
        - Method: `GET`
        - Description: Retrieves all posts.
        - Responses:
            * `200 OK`: Returns an array of posts.
            * `500 Internal Server Error`: Error message.

    6) Like a Post by ID:

        - URL: `/api/posts/like/:id`
        - Method: `PUT`
        - Description: Likes or unlikes a post by its ID.
        - Headers: `Authorization: Bearer <token>`
        - Responses:
            * `200 OK`: Post liked/unliked successfully.
            * `404 Not Found`: Post not found.
            * `500 Internal Server Error`: Error message.

#### USERS

    1) Search Users:

        - URL: `/api/users/search`
        - Method: `GET`
        - Description: Searches for users based on query parameters (name, username, email).
        - Responses:
            * `200 OK`: Returns an array of users matching the search criteria.
            * `500 Internal Server Error`: Error message.

    2) Sign Up User:

        - URL: `/api/users/signup`
        - Method: `POST`
        - Description: Signs up a new user.
        - Request Body:
        {
            "name": "User's Name",
            "username: "User user name",
            "email": "user@example.com",
            "password": "password"
        }
        - Responses:
        - `201 Created`: User signed up successfully.
        - `400 Bad Request`: Invalid user data.
        - `500 Internal Server Error`: Error message.

    3) Log In User:

        - URL: `/api/users/login`
        - Method: `POST`
        - Description: Log in a user
        - Request Body:
        {
            "emailORusername": "user@example.com",
            "password": "password"
        }
        - Responses:
            * `200 OK`: User logged in successfully.
            * `400 Bad Request`: Invalid email or password.
            * `500 Internal Server Error`: Error message.

    4) Log Out User:

        - URL: `/api/users/logout`
        - Method: `POST`
        - Description: Logs out the current user.
        - Headers: `Authorization: Bearer <token>`
        - Responses:
            * `200 OK`: User logged out successfully.
            * `401 Unauthorized`: User not authenticated.
            * `500 Internal Server Error`: Error message.

    5) Get User by ID:

        - URL: `/api/users/:id`
        - Method: `GET`
        - Description: Retrieves a user by their ID.
        - Responses:
        - `200 OK`: Returns the user data.
        - `404 Not Found`: User not found.
        - `500 Internal Server Error`: Error message.

    6) Update User by ID

        - URL: `/api/users/:id`
        - Method: `PUT`
        - Description: Updates a user by their ID.
        - Request Body:
    {
        "name": "Updated Name",
        "username": "Updated UserName",
        "email": "updated@example.com",
        "bio": "Details of user any bio thing",
        "profilePic": "Base64EncodedImageString"
    }
        - Responses:
            * `200 OK`: User updated successfully.
            * `400 Bad Request`: Invalid user data.
            * `404 Not Found`: User not found.
            * `500 Internal Server Error`: Error message.

    7) Get All Posts by User

        - URL: `/api/users/:id/posts`
        - Method: `GET`
        - Description: Retrieves all posts created by a user.
        - Responses:
            * `200 OK`: Returns an array of posts by the user.
            * `404 Not Found`: User not found.
            * `500 Internal Server Error`: Error message.

    8) Get Liked Posts by User:

        - URL: `/api/users/liked/:id`
        - Method: `GET`
        - Description: Retrieves all posts liked by a user.
        - Headers: `Authorization: Bearer <token>`
        - Responses:
            * `200 OK`: Returns an array of liked posts by the user.
            * `401 Unauthorized`: User not authenticated.
            * `404 Not Found`: User not found.
            * `500 Internal Server Error`: Error message.
