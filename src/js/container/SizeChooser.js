import React, { Component } from 'react';
import { Checkbox, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

class SizeChooser extends Component {
  render() {
    const {
      hasGaugeAdjustments,
      originalImage,
      onHasGaugeAdjustmentChange,
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
        <Checkbox 
          checked={hasGaugeAdjustments}
          onChange={onHasGaugeAdjustmentChange}
        >
          Adjust for gauge
        </Checkbox>
      </div>
    );
  }
}

export default SizeChooser;
