import React, { Component } from 'react';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

class ColorQuantityChooser extends Component {
  render() {
    const {
      colorQuantity,
      onColorQuantityChange,
      stitchesHigh,
      stitchesWide,
    } = this.props;
    if (!stitchesHigh && !stitchesWide) {
      return null;
    }

    return (
      <div>
        <h3>Step 4</h3>
        <FormGroup>
          <ControlLabel>Number of colors</ControlLabel>
          <FormControl
            value={colorQuantity}
            onChange={onColorQuantityChange}
          />
        </FormGroup>
      </div>
    );
  }
}

export default ColorQuantityChooser;
