# 2feat
## API

### Admin Controller

- POST `/register` => Creates a new admin.

  - Example Request:

    ```json
    {
      "email": "example@mail.com",
      "password": "password",
      "category": ["Adidas", "Nike"] // You can add some categories for sneakers beforehand
    }
    ```

  - Example Response:
    ```json
    {
      "email": "example@mail.com",
      "password": "password",
      "category": ["Adidas", "Nike"],
      "_id": "61bd3becd12036443f2b8c05", // id given by mongoDB
      "__v": 0
    }
    ```

- POST `/loginAdmin` => To login and access the admin privilege

  - Example Request:

    ```json
    {
      "email": "example@mail.com",
      "password": "password"
    }
    ```

  - Example Response:
    ```json
    "61bd3becd12036443f2b8c05" // id given by mongoDB for adminSchema
    ```

- GET `/getCategory` => To get all the categories available

  - Example Response:
    ```json
    {
      "_id": "61bd3becd12036443f2b8c05",
      "category": ["Adidas", "Nike"]
    }
    ```

- POST `/updateCategory` => To update the categories stored in database

  - Example Request:

    ```json
    {
      "id": "61bd3becd12036443f2b8c05", // admin id given by mongoDB
      "category": ["Adidas", "Nike", "Puma"]
    }
    ```

  - Example Response:
    ```json
    {
      "msg": "Category updated successfully!"
    }
    ```

### Sneaker Controller

- GET `/sneakers/` => To get info about all the sneakers

  - Example Response:
    ```json
    [
      {
        "_id": "61b3a56939ba97cb23565109", // object id given by mongoDB
        "title": "Sneaker",
        "price": 400,
        "description": "Hello I am description.",
        "mainImage": "qx3ixxrxeglbfiysommk", // Public Id that we get from cloudinary API for images
        "otherImages": [
          // Public Ids that we get from cloudinary API for images
          "srhf6nhxjoelkkvficdz",
          "nybtr7epedzcikmgphmz",
          "d6fjv42gdalno95cbvb8",
          "zrlcwzogswuczlm9kqdp"
        ],
        "category": "Adidas",
        "rating": 2,
        "tags": ["adidas", "sneaker"],
        "__v": 0
      }
    ]
    ```

- GET `/sneakers/:id` => id -> object id of the post. To get info about the particular sneaker

  - Example Response:
    ```json
    {
      "_id": "61b3a56939ba97cb23565109", // object id given by mongoDB
      "title": "Sneaker",
      "price": 400,
      "description": "Hello I am description.",
      "mainImage": "qx3ixxrxeglbfiysommk", // Public Id that we get from cloudinary API for images
      "otherImages": [
        // Public Ids that we get from cloudinary API for images
        "srhf6nhxjoelkkvficdz",
        "nybtr7epedzcikmgphmz",
        "d6fjv42gdalno95cbvb8",
        "zrlcwzogswuczlm9kqdp"
      ],
      "category": "Adidas",
      "rating": 2,
      "tags": ["adidas", "sneaker"],
      "__v": 0
    }
    ```

- POST `/sneakers/add` => To add new sneaker to the database

  - Example Request:

    ```json
    {
      "title": "Adidas Prime",
      "price": 400,
      "description": "Description",
      "mainImage": "base64 encoded image file",
      "otherImages": [
        "base64 encoded image file_1",
        "base64 encoded image file_2"
      ],
      "category": "Adidas",
      "rating": 5,
      "tags": ["adidas", "prime adidas"]
    }
    ```

  - Example Response:
    ```json
    {
      "_id": "62b9d56939ba97bf23565290", // object id given by mongoDB
      "title": "Adidas Prime",
      "price": 400,
      "description": "Description",
      "mainImage": "qx3ixxrxeglbfiysommk", // Public Id that we get from cloudinary API for images
      "otherImages": [
        // Public Ids that we get from cloudinary API for images
        "srhf6nhxjoelkkvficdz",
        "nybtr7epedzcikmgphmz"
      ],
      "category": "Adidas",
      "rating": 5,
      "tags": ["adidas", "prime adidas"],
      "__v": 0
    }
    ```

- PUT `/sneakers/:id` => id -> object id of the post. To update the details about particular sneaker in the database

  - Example Request:

    ```json
    {
      "title": "Adidas Primo",
      "price": 450,
      "description": "Changed Description",
      "category": "Adidas",
      "rating": 5,
      "tags": ["adidas", "sneaker"]
    }
    ```

  - Example Response:
    ```json
    { "msg": "Sneaker details updated successfully!" }
    ```

- DELETE `/sneakers/:id` => id -> object id of the post. To delete the particular sneaker from database

  - Example Request:

    ```json
    {}
    ```

  - Example Response:
    ```json
    { "msg": "Sneaker deleted successfully!" }
    ```
