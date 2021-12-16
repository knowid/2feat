import React from "react";
import axios from "axios";
import { Image } from "cloudinary-react";
import { NavLink } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Post: [
        {
          title: "",
          price: "",
          description: "",
          mainImage: "",
          otherImages: [],
          category: "",
          rating: "",
          tags: [],
          _id: "",
        },
      ],
      FilterPost: [
        {
          title: "",
          price: "",
          description: "",
          mainImage: "",
          otherImages: [],
          category: "",
          rating: "",
          tags: [],
          _id: "",
        },
      ],
      Categories: [],
      searchQuery: "",
      maxPost: 2,
    };

    this.CategoryClick = this.CategoryClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    console.log(window.location.pathname);
    try {
      await axios({
        method: "get",
        url: `/sneakers/`,
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
              FilterPost: posts,
            });
          }
        })
        .catch((err) => console.error(err));
    } catch (err) {
      alert(err);
    }

    try {
      await axios({
        method: "get",
        url: `/getCategory`,
      })
        .then((res) => {
          const cata = res.data.category;
          console.log(cata);

          if (!cata) {
            alert("Could not find the catagories you are looking for!");
            window.location = "/";
          } else {
            this.setState({
              Categories: cata,
            });
          }
        })
        .catch((err) => console.error(err));
    } catch (err) {
      alert(err);
    }
  }

  CategoryClick(cate) {
    let temp = this.state.Post;
    const ofCategory = temp.filter((c) => c.category === cate);

    this.setState({ FilterPost: ofCategory });
  }

  onSubmit(e) {
    e.preventDefault();
    let temp = this.state.Post;
    const ofTags = temp.filter((c) => c.tags.includes(this.state.searchQuery));

    this.setState({ FilterPost: ofTags });
  }

  render() {
    console.log(this.state.searchQuery);
    let renderPosts = () => {
      const Post = () => {
        const AllPost = this.state.FilterPost;
        const fewPost = AllPost.slice(0, this.state.maxPost);
        return (
          <div>
            {fewPost.map((post) => {
              const split = post.description.split(".");
              const filteredDesc = split[0] + "</p>";
              return (
                <div className="post">
                  <p className="post-title">{post.title}</p>
                  <Image publicId={post.mainImage} cloudName="feat" />
                  <div className="texts">
                    <p dangerouslySetInnerHTML={{__html: filteredDesc}}></p>
                  </div>
                  <span className="read-more-btn">
                    <NavLink to={`/single/${post._id}`}>read more</NavLink>{" "}
                  </span>
                </div>
              );
            })}
          </div>
        );
      };

      return <Post />;
    };

    let renderCategory = () => {
      const Cata = () => {
        return (
          <div>
            {this.state.Categories.map((c) => {
              return (
                <li
                  onClick={() => {
                    this.CategoryClick(c);
                  }}>
                  <a href="#">{c}</a>
                </li>
              );
            })}
          </div>
        );
      };

      return <Cata />;
    };

    return (
      <div>
        <div id="posts">
          <div class="container posts-container">
            <div class="posts-list">{renderPosts()}</div>

            <div class="categories-list">
              <form onSubmit={this.onSubmit}>
                <div class="form-group">
                  <input
                    type="text"
                    name="search_keyword"
                    id="search keyword"
                    placeholder="Search here"
                    onChange={(e) =>
                      this.setState({ searchQuery: e.target.value })
                    }
                  />
                </div>
                <input type="submit" value="Search" />
              </form>

              <div class="categories">
                <h2 class="category-title">Categories</h2>
                <ul>{renderCategory()}</ul>
              </div>
            </div>
          </div>
        </div>

        <div id="load-more">
          <div class="container">
            <button
              class="load-more-btn"
              onClick={() =>
                this.setState({ maxPost: this.state.maxPost + 2 })
              }>
              Show more products...
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
