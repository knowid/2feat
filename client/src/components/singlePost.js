import React from "react";
import { Image } from "cloudinary-react";
import { NavLink } from "react-router-dom";
import axios from "axios";

class SinglePost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Post: {
        title: "",
        price: "",
        description: "",
        subject: "",
        mainImage: "",
        otherImages: [],
        category: "",
        rating: "",
        tags: [],
        _id: "",
      },
    };
  }

  async componentDidMount() {
    try {
      const pathname = window.location.pathname.split("/");
      const sneakerId = pathname[2];
      await axios({
        method: "get",
        url: `/sneakers/${sneakerId}`,
      })
        .then((res) => {
          const posts = res.data;
          console.log(posts);

          if (!posts) {
            alert("Could not find the Post you are looking for!");
            window.location = "/";
          } else {
            this.setState({
              Post: posts,
            });
          }
        })
        .catch((err) => console.error(err));
    } catch (err) {
      alert(err);
    }
  }

  render() {
    const renderOtherImages = () => {
      const images = this.state.Post.otherImages.map((result, index) => {
        return (
          <Image
            key={result + index}
            cloudName="feat"
            publicId={result}
            crop="scale"
          />
        );
      });

      return <>{images}</>;
    };

    let renderPost = () => {
      const blog = this.state.Post;
      const Post = () => {
        return (
          <div>
            <div id="post">
              <div class="container post-container">
                <p class="post-title">{blog.title}</p>
                <Image
                  publicId={blog.mainImage}
                  cloudName="feat"
                  class="post-image"
                />

                <div class="texts">
                  <div>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: blog.description,
                      }}></p>
                  </div>
                  <div>
                    <p>Rating : {blog.rating}</p>
                    <p>Price: {blog.price}</p>
                  </div>
                </div>
              </div>
            </div>

            <div id="post-images">
              <div class="container post-images-container">
                {renderOtherImages()}
              </div>
            </div>
          </div>
        );
      };

      return <Post />;
    };
    return <div>{renderPost()}</div>;
  }
}

export default SinglePost;
