import React from "react";
import "../css/style.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

class AddPost extends React.Component {
  constructor(props) {
    super(props);

    this.descValue = React.createRef();

    this.state = {
      title: "",
      price: "",
      description: "",
      input: "",
      selected: "",
      preview: "",
      mainImage: "",
      otherImages: [],
      category: "",
      rating: 1,
      tags: "",
      cate: [],
      editorState: EditorState.createEmpty(),
    };

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeTags = this.onChangeTags.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);

    this.handleMainImage = this.handleMainImage.bind(this);
    this.previewMainImage = this.previewMainImage.bind(this);
    this.handleMultipleImage = this.handleMultipleImage.bind(this);
    this.previewOtherImages = this.previewOtherImages.bind(this);

    this.onEditorStateChange = this.onEditorStateChange.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeTitle(e) {
    e.preventDefault();
    this.setState({
      title: e.target.value,
    });
  }

  onChangePrice(e) {
    e.preventDefault();
    this.setState({
      price: e.target.value,
    });
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState: editorState,
    });
    console.log(this.descValue.current.value);
  }

  onChangeTags(e) {
    e.preventDefault();
    this.setState({
      tags: e.target.value,
    });
  }

  onChangeCategory(e) {
    this.setState({
      category: e.target.value,
    });
  }
  onChangeRating(e) {
    e.preventDefault();
    this.setState({
      rating: e.target.value,
    });
  }

  handleMainImage(e) {
    e.preventDefault();
    const file = e.target.files[0];
    this.previewMainImage(file);
    this.setState({
      selected: file,
      input: e.target.value,
    });
  }

  previewMainImage(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({
        mainImage: reader.result,
      });
    };
    reader.onerror = (err) => {
      alert(err);
    };
  }

  //for image handling of multiple image addition
  handleMultipleImage(e) {
    e.preventDefault();
    if (this.state.otherImages.length === 4) {
      let temp = this.state.otherImages;
      temp.splice(0, 1);
      this.setState({
        otherImages: temp,
      });
    }
    const file = e.target.files[0];
    this.previewOtherImages(file);
  }

  async previewOtherImages(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({
        otherImages: [...this.state.otherImages, reader.result],
      });
    };
    reader.onerror = (err) => {
      alert(err);
    };
  }

  async onSubmit(e) {
    e.preventDefault();
    try {
      const id = sessionStorage.getItem("adminId");
      if (!id) {
        return alert("Not authenticated");
      }
      if (!this.state.selected) {
        alert("No Main-Image added!");
        return;
      }

      let tag = this.state.tags;
      const tagPost = tag.split(", ");

      await axios({
        method: "post",
        url: "/sneakers/add",
        data: {
          title: this.state.title,
          price: this.state.price,
          category: this.state.category,
          description: this.descValue.current.value,
          mainImage: this.state.mainImage,
          otherImages: this.state.otherImages,
          rating: this.state.rating,
          tags: tagPost,
        },
      }).then((res) => {
        console.log(res);
        if (res.data) {
          window.location = "/showallpost";
        }
      });
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }

  async componentDidMount() {
    await axios.get("/getCategory").then((res) => {
      const cata = res.data.category;

      this.setState({
        cate: cata,
        category: cata[0],
      });
    });
  }

  render() {
    return (
      <div id="add-post">
        <div class="container add-post-container">
          <h1 class="py-1">Add post</h1>
          <form onSubmit={this.onSubmit}>
            <div class="form-group">
              <label for="title">Title of the post </label>
              <input
                type="text"
                name="title"
                id="title"
                value={this.state.title}
                onChange={this.onChangeTitle}
              />
            </div>
            <div class="form-group">
              <label for="price">Price</label>
              <input
                type="number"
                name="price"
                id="price"
                value={this.state.price}
                onChange={this.onChangePrice}
              />
            </div>

            {/* <div class="form-group"> */}
              <label for="description">Description</label>
              <Editor
                editorState={this.state.editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onEditorStateChange}
              />
              <textarea
              disabled
                style={{ display: "none" }}
                ref={this.descValue}
                value={draftToHtml(
                  convertToRaw(this.state.editorState.getCurrentContent())
                )}></textarea>
            {/* </div> */}

            <div class="form-group">
              <label for="category">Category</label>
              <select
                name="category"
                id="category"
                value={this.state.category}
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
                value={this.state.rating}
                onChange={this.onChangeRating}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <div class="form-group">
              <label for="single_file">Upload a (single) file</label>
              <input
                type="file"
                name="single_file"
                id="single_file"
                value={this.state.input}
                onChange={this.handleMainImage}
              />
              {this.state.mainImage && (
                <img
                  style={{ width: "250px" }}
                  src={this.state.mainImage}
                  alt="chosen"
                />
              )}
            </div>
            <div class="form-group">
              <label for="file">Upload multiple files</label>
              <input
                type="file"
                name="image"
                id="file"
                onChange={this.handleMultipleImage}
              />
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                {this.state.otherImages[0] &&
                  this.state.otherImages.map((res, index) => {
                    return (
                      <img
                        style={{ width: "200px" }}
                        src={res}
                        alt="Other Images"
                        key={index}
                      />
                    );
                  })}
              </div>
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

export default AddPost;
