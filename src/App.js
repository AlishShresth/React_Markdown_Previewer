import React from "react";
import "./App.css";
import { marked } from "marked";
import "bootstrap/dist/css/bootstrap.css";

class App extends React.Component {
  constructor(props) {
    const initialState = `
  This is a paragraph
  
  **This is bolded text**
    
  >Block Quotes!
  
  # Heading
  ## Heading 2
  
  - list item 1
  - list item 2
  - list item 3
  
  [Visit my website](https://florin-pop.com)
  
  This is a inline \`<div></div>\`
  
  This is a block of code
  
  \`\`\`
  let x = 1;
  let y = 2;
  let z = x+y;
  \`\`\`
  ![React](https://i0.wp.com/programmingwithmosh.com/wp-content/uploads/2019/01/2000px-React-icon.svg_.png?fit=2000%2C1413&ssl=1)`;
    super(props);
    this.state = {
      text: initialState,
      isEditorExpanded: false,
      isPreviewExpanded: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorClick = this.handleEditorClick.bind(this);
    this.handlePreviewClick = this.handlePreviewClick.bind(this);
  }
  handleEditorClick() {
    this.setState({
      isEditorExpanded: !this.state.isEditorExpanded,
    });
  }
  handlePreviewClick() {
    this.setState({
      isPreviewExpanded: !this.state.isPreviewExpanded,
    });
  }
  handleChange(e) {
    this.setState({
      text: e.target.value,
    });
  }

  render() {
    const { isEditorExpanded, isPreviewExpanded } = this.state;
    const { text } = this.state;
    const markdown = marked.parse(text, { breaks: true });
    return (
      <div class="container mt-3">
        <div className="row">
          <div
            className={
              isPreviewExpanded
                ? "hide"
                : isEditorExpanded
                ? "col-10 expanded"
                : "col-7"
            }
            id="col1"
          >
            <div className="heading">
              Editor
              <button className="btn btn-sm" onClick={this.handleEditorClick}>
                <i
                  className={
                    isEditorExpanded ? "fa fa-compress" : "fa fa-arrows-alt"
                  }
                ></i>
              </button>
            </div>
            <textarea
              id="editor"
              className={
                isEditorExpanded
                  ? "form-control p-2 expand"
                  : "form-control p-2"
              }
              value={text}
              onChange={this.handleChange}
              placeholder="Enter your markdown here."
            />
          </div>
          <div className="col-10" id="col2">
            <div className="heading">
              Preview
              <button className="btn btn-sm" onClick={this.handlePreviewClick}>
                <i
                  className={
                    isPreviewExpanded ? "fa fa-compress" : "fa fa-arrows-alt"
                  }
                ></i>
              </button>
            </div>

            <div
              className={
                isPreviewExpanded
                  ? "preview rounded expandedPreview"
                  : "preview rounded"
              }
              dangerouslySetInnerHTML={{ __html: markdown }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
