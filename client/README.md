# 2 F.E.A.T

> LINK TO APP

2 F.E.A.T is a website that lists down the blog posts and lets us read the description about the related blogs. Apart from that, it allows visitors to see posts by categories and through search functionality too. 2 F.E.A.T has an admin area too which is accessible after logging into the website. The admin panel allows an admin user to manage blog posts and categories too with ease.

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
- Create a .env folder inside the project folder with the keys MONGODB_URI which you get from your mongodb cluster and CLOUD_NAME, CLOUD_API_KEY AND CLOUD_API_SECRET which you get fromm cloudinary.
- Now you can run the project locally. "node server.js" for running the backend and inside the client folder "npm start" to run the frontend.


#### user stories
Mostly, our users would be teenagers or young aged group people who are sneaker lovers. Our website will provide information about different shoes that are trending on the market so that users don't need to spend hours figuring out the better matching shoes for themselves.
>
As a visitor of the website (2 F.E.A.T), they should be able to read the description about the blog they want using READ MORE button on the webpage as well as be able to see the multiple images associated with the post along with the post description.

> As a visitor, they'll explore the blog posts on the website whenever they wish to buy sneakers so that they can get ideas on what type of sneaker will best suit them.

> As a visitor, they would be able to search (filter) products that are defined (added) by admin to get the blog post that is associated with the tags which will make the website more friendly to the users and benefit them from a different perspective like informing the user about the quality of the sneaker, price ranges, and so on...

##### Future features
- Able to integrate online shop services that can process online payments, and keep track of order and it's status.
- Show trending sneakers.
- More advanced filters to filter out the blog posts by date.

> WIREFRAME LINK: All the wireframes are present on the same project folder with name wireframes.