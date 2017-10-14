import React, { Component } from 'react';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

class GaugeChooser extends Component {
  render() {
    const { 
      hasGaugeAdjustments,
      gaugeHigh,
      gaugeWide,
      onGaugeHighChange,
      onGaugeWideChange,
    } = this.props;
    if (!hasGaugeAdjustments) {
      return null;
    }

    return (
      <div>
        <h4>For an N-stitches by N-rows swatch</h4>
        <FormGroup>
          <ControlLabel>Height in inches or centimeters</ControlLabel>
          <FormControl 
            value={gaugeHigh} 
            onChange={onGaugeHighChange}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Width in inches or centimeter</ControlLabel>
          <FormControl
            value={gaugeWide}
            onChange={onGaugeWideChange}
          />
        </FormGroup>
      </div>
    );
  }
}

export default GaugeChooser;
