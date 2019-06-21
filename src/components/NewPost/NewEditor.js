import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

class NewEditor extends Component {

  componentDidMount() {
    ClassicEditor.builtinPlugins.map( plugin => console.log(plugin.pluginName) );
  }

  render() {
    return (
      <CKEditor
        config={{
          removeButtons: 'imageUpload'
        }}
        editor={ClassicEditor}
        placeholder="Hello!"
        onInit={editor => {}}
        onChange={(event, editor) => {
          const data = editor.getData();
          localStorage.setItem("data", editor.getData());
        }}
        onBlur={editor => {}}
        onFocus={editor => {}}
      />
    );
  }
}

export default NewEditor;
