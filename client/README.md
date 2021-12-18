# 2 F.E.A.T

> LINK TO APP: https://twofeat.herokuapp.com/

2 F.E.A.T is a website that lists the sneaker blog posts and lets you read the description about the related sneaker blogs. Apart from that, it allows visitors to see the posts by categories and search functionality also. It also allows you to search the sneakers by tags. 2 F.E.A.T has an admin area which is accessible after logging into the website. The admin panel allows an admin user to manage the blog posts and categories with ease also.

## Technologies used
- HTML (Version: HTML5)
- CSS (Version: CSS3)
- Javascript ( Node JS for the backend)
- MongoDB ( Used as a database )
- Cloudinary ( Cloud hosting service for images )
- React ( Used in the frontend )
- Heroku ( Used for the deployment )

### Installation
- Clone the repository
- Go inside the project folder by typing "cd 2feat" on the terminal
- Type the command "npm install && cd client && npm install"
- Create a .env folder inside the project folder with the keys MONGODB_URI which you get from your mongodb cluster and CLOUD_NAME, CLOUD_API_KEY AND CLOUD_API_SECRET which you get from cloudinary.
- If you are using the build version of the frontend by running `npm build` inside the client folder add the code below just after line 28 in server.js
	```
	app.use(express.static("./client/build"));
  	app.get("/*", function (req, res) {
	    res.sendFile(path.join(__dirname, "./client/build/index.html"));
	  });
	```
- If you are not using the build, you'll need to add baseURL for axios pointing to backend API in index.js file inside client folder if you are not using the build version.
	- First import axios in index.js file
	- Then add: "axios.defaults.baseURL = `http://localhost:/${port}`" where port signifies the port number for backend.

- Now you can run the project locally. "node server.js" for running the backend and inside the client folder "npm start" to run the frontend.
- And for accessing the admin privilege first you need to make a post request to `/register` through postman or similar technologies.


#### user stories
Mostly, our users would be teenagers or young aged group people who are sneaker lovers. My website will provide information about different sneakers that are trending on the market as well as sneakers that they are interested in so that users don't need to spend hours searching the internet and different sites.
>
As a visitor of the website (2 F.E.A.T), they should be able to read the description about the blog they want using READ MORE button on the webpage as well as be able to see the multiple images associated with the post along with the post description.

> As a visitor, they'll explore the blog posts on the website whenever they wish to buy sneakers so that they can get ideas on what type of sneaker will best suit them.

> As a visitor, they would be able to search (filter) products that are defined (added) by admin to get the blog post that is associated with the tags which will make the website more friendly to the users and benefit them from a different perspective like informing the user about the quality of the sneaker, price ranges, story behind the creation of them and so on...


> As a user, you can visit the Amazon.com site of that particular sneaker through the hyperlink in the blog post, so that you can purchase it.

##### Future features
- Able to integrate online shop services that can process online payments, and keep track of order and it's status.
- Show trending sneakers.
- More advanced filters to filter out the blog posts by date.
- Links to other places besides Amazon.com to purchase the sneakers.

> WIREFRAME LINK: All the wireframes are present on the same project folder with name wireframes.