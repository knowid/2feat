import React from "react";
import "../css/style.css";
import axios from "axios";
import EditPost from "./editPost";

import { NavLink } from "react-router-dom";

class ShowAllPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Post: [
        {
          title: "",
          price: "",
          description: "",
          category: "",
          rating: "",
          tags: [],
          _id: "",
        },
      ],
      edit: false,
      editpost: {},
    };
    this.deletePost = this.deletePost.bind(this);
    this.filterDescription = this.filterDescription.bind(this);
  }

  filterDescription(post){
    const split = post.description.split('.');
    const filteredDesc = split[0] + "</p>";
    return filteredDesc;
  }

  async deletePost(id) {
    // Simple DELETE request with axios
    await axios.delete(`/sneakers/${id}`).then(() => {
      let posts = this.state.Post;
      let filteredPost = posts.filter((item) => {
        if (item._id === id) {
          return false;
        }
        return true;
      });
      this.setState({ Post: filteredPost });
    });
  }

  goForUpdatePost(post) {
    this.setState({
      edit: true,
      editpost: post,
    });
  }

  async componentDidMount() {
    try {
      await axios({
        method: "get",
        url: `/sneakers/`,
      })
        .then((res) => {
          const posts = res.data;

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
    let renderPosts = () => {
      const Post = () => {
        return (
          <>
            {this.state.Post.map((post, i = 1) => {
              return (
                <tr key={i}>
                  <td>{i++}</td>
                  <td>{post.title}</td>
                  <td>${post.price}</td>
                  <td dangerouslySetInnerHTML={{__html: this.filterDescription(post)}}></td>
                  <td>{post.category}</td>
                  <td>{post.tags.slice(0, 5).map((tag) => `${tag} `)}</td>

                  <td>
                    <a
                      href="#"
                      onClick={() => {
                        this.deletePost(post._id);
                      }}>
                      <i class="fa fa-trash"></i>
                    </a>
                    <a
                      onClick={() => {
                        this.goForUpdatePost(post);
                      }}>
                      <i class="fa fa-edit"></i>
                    </a>
                  </td>
                </tr>
              );
            })}
          </>
        );
      };

      return <Post />;
    };
    return this.state.edit ? (
      <EditPost post={this.state.editpost} goBack={()=>{this.setState({edit : false})}} />
    ) : (
      <div id="all-posts">
        <div class="container all-posts-container">
          <h1 class="py-1">All posts</h1>
          <table id="all-posts-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Title</th>
                <th>Price</th>
                <th>Description</th>
                <th>Category</th>
                <th>Tags</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{renderPosts()}</tbody>
          </table>
          <div class="load-more-btn-group">
            <button href="#" class="load-more-btn" id="load-more">
              Load more
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowAllPost;
