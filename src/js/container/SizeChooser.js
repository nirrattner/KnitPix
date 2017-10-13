import React, { Component } from 'react';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

import '../../css/file-chooser.css'

class SizeChooser extends Component {
  render() {
    const { 
      originalImage,
      onStitchesHighChange,
      onStitchesWideChange,
      stitchesHigh,
      stitchesWide,
    } = this.props;
    if (!originalImage) {
      return null;
    }

    return (
      <div>
        <h3>Step 2</h3>
        <FormGroup>
          <ControlLabel>Stitches High</ControlLabel>
          <FormControl 
            value={stitchesHigh} 
            onChange={onStitchesHighChange}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Stitches Wide</ControlLabel>
          <FormControl
            value={stitchesWide}
            onChange={onStitchesWideChange}
          />
        </FormGroup>
      </div>
    );
  }
}

export default SizeChooser;
