import React, { Component } from 'react';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

class GridColorChooser extends Component {
  render() {
    const {
      gridColor,
      onGridColorChange,
      stitchesHigh,
      stitchesWide,
    } = this.props;
    if (!stitchesHigh && !stitchesWide) {
      return null;
    }

    return (
      <div>
        <h3>Step 3</h3>
        <FormGroup>
          <ControlLabel>Grid color</ControlLabel>
          <FormControl 
            type="color"
            value={gridColor}
            onChange={onGridColorChange}
          />
        </FormGroup>
      </div>
    );
  }
}

export default GridColorChooser;
