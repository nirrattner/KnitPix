import React, { Component } from 'react';

import '../../css/file-chooser.css'

class FileChooser extends Component {
  render() {
    const { onFileChange } = this.props;
    return (
      <div>
        <h3>Step 1</h3>
        <label className="btn btn-default">
          Choose a PNG image 
          <input 
            className="file-input" 
            type="file"
            accept=".png"
            onChange={onFileChange}
          />
        </label>
      </div>
    );
  }
}

export default FileChooser;
