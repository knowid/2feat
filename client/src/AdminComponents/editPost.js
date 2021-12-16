import React from "react";
import "../css/style.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw,ContentState, convertFromHTML } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

class EditPost extends React.Component {
  constructor(props) {
    super(props);

    const joinTags = props.post.tags.join(", ");
    this.descValue = React.createRef();

    this.state = {
      Post: props.post,
      cate: [],
      tags: joinTags,
      editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(props.post.description)
        ))
    };

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);
    this.onChangeTags = this.onChangeTags.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeTitle(e) {
    e.preventDefault();
    let temp = this.state.Post;
    temp.title = e.target.value;
    this.setState({
      Post: temp,
    });
  }

  onChangePrice(e) {
    e.preventDefault();
    let temp = this.state.Post;
    temp.price = e.target.value;
    this.setState({
      Post: temp,
    });
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState: editorState,
    });
  }

  onChangeCategory(e) {
    e.preventDefault();
    let temp = this.state.Post;
    temp.category = e.target.value;
    this.setState({
      Post: temp,
    });
  }

  onChangeRating(e) {
    e.preventDefault();
    let temp = this.state.Post;
    temp.rating = e.target.value;
    this.setState({
      Post: temp,
    });
  }

  onChangeTags(e) {
    e.preventDefault();
    this.setState({
      tags: e.target.value,
    });
  }

  async onSubmit(e) {
    e.preventDefault();
    const adminId = sessionStorage.getItem("adminId");
    if (!adminId) {
      return alert("Not authenticated");
    }
    const id = this.state.Post._id;
    let tempPost = this.state.Post;
    const tempTags = this.state.tags.split(", ");
    tempPost.tags = tempTags;
    tempPost.description = this.descValue.current.value;
    this.setState({
      Post: tempPost,
    });
    try {
      await axios
        .put(`/sneakers/${id}`, this.state.Post)
        .then((res) => {
          const posts = res.data;
          console.log(posts);

          if (!posts) {
            alert("Could not find the Post you are looking for!");
            window.location = "/showallpost";
          } else {
            this.setState({
              Post: {},
            });

            window.location = "/showallpost";
          }
        })
        .catch((err) => console.error(err));
    } catch (err) {
      alert(err);
    }
  }

  async componentDidMount() {
    await axios.get("/getCategory").then((res) => {
      const cata = res.data.category;
      console.log(cata);

      this.setState({
        cate: cata,
      });
    });
  }

  render() {
    return (
      <div id="edit-post">
        <div class="container edit-post-container">
        <span style={{fontSize: "2em", cursor:"pointer"}} onClick={this.props.goBack}>Back</span>
          <h1 class="py-1">Edit post</h1>
          <form onSubmit={this.onSubmit}>
            <div class="form-group">
              <label for="title">Title of the post </label>
              <input
                type="text"
                value={this.state.Post.title}
                name="title"
                id="title"
                onChange={this.onChangeTitle}
              />
            </div>
            <div class="form-group">
              <label for="price">Price</label>
              <input
                type="number"
                name="price"
                value={this.state.Post.price}
                id="price"
                onChange={this.onChangePrice}
              />
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <Editor
                editorState={this.state.editorState}
                onEditorStateChange={this.onEditorStateChange}
              />
              <textarea
                disabled
                style={{ display: "none" }}
                ref={this.descValue}
                value={draftToHtml(
                  convertToRaw(this.state.editorState.getCurrentContent())
                )}></textarea>
            </div>
            <div class="form-group">
              <label for="category">Category</label>
              <select
                name="category"
                id="category"
                value={this.state.Post.category}
                onChange={this.onChangeCategory}>
                {this.state.cate.map((c) => {
                  return <option value={c}>{c}</option>;
                })}
              </select>
            </div>

            <div class="form-group">
              <label for="rating">Rating</label>
              <select
                name="rating"
                id="rating"
                value={this.state.Post.rating}
                onChange={this.onChangeRating}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <div class="form-group">
              <label for="tags">Tags</label>
              <input
                type="text"
                name="tags"
                id="tags"
                value={this.state.tags}
                onChange={this.onChangeTags}
              />
            </div>
            <input type="submit" value="Save" class="save-btn" />
          </form>
        </div>
      </div>
    );
  }
}

export default EditPost;
