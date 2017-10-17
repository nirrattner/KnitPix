import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import debounce from 'javascript-debounce';

import Sidebar from './container/Sidebar';
import OriginalImage from './container/OriginalImage';
import ModifiedImage from './container/ModifiedImage';

import * as DimensionCalculator from './library/DimensionCalculator';
import * as ImageProcessor from './library/ImageProcessor';
import * as ImageReader from './library/ImageReader';
import * as ImageSerializer from './library/ImageSerializer';

import '../css/app.css'

class App extends Component {

  constructor(props) {
    super(props);
    this.debounceUpdateImage = debounce(this.updateImage, 350);
    this.state = {
      colorQuantity: '',
      hasGaugeAdjustments: false,
      isHeightLastModified: false,
      gaugeHigh: '',
      gaugeWide: '',
      gridColor: '#000000',
      modifiedImageSource: null,
      originalImage: null,
      originalImageSource: null,
      stitchesHigh: '',
      stitchesWide: '',      
    };
  }

  onColorQuantityChange({ target: { value } }) {
    const colorQuantity = parseInt(value, 10);
    if (colorQuantity) {
      this.setState({ colorQuantity });
    } else if (!value) {
      this.setState({ colorQuantity: '' });
    }
    this.debounceUpdateImage();
  }

  onGaugeHighChange({ target: { value } }) {
    const { hasGaugeAdjustments, gaugeWide } = this.state;
    const gaugeHigh = parseInt(value, 10);
    if (gaugeHigh) {
      this.setState({ gaugeHigh });
      this.updateStitches({ hasGaugeAdjustments, gaugeHigh, gaugeWide });
    } else if (!value) {
      this.setState({ gaugeHigh: '' });
    }
  }

  onGaugeWideChange({ target: { value } }) {
    const { hasGaugeAdjustments, gaugeHigh } = this.state;
    const gaugeWide = parseInt(value, 10);
    if (gaugeWide) {
      this.setState({ gaugeWide });
      this.updateStitches({ hasGaugeAdjustments, gaugeHigh, gaugeWide });
    } else if (!value) {
      this.setState({ gaugeWide: '' });
    }
  }

  onHasGaugeAdjustmentChange() {
    const { hasGaugeAdjustments } = this.state;
    this.setState({ 
      gaugeHigh: '',
      gaugeWide: '',
      hasGaugeAdjustments: !hasGaugeAdjustments
    });
    this.updateStitches({ hasGaugeAdjustments: !hasGaugeAdjustments });
  }

  updateStitches({ gaugeHigh, gaugeWide, hasGaugeAdjustments }) {
    const { isHeightLastModified, originalImage, stitchesHigh, stitchesWide } = this.state;
    if (isHeightLastModified && stitchesHigh) {
      this.setState(DimensionCalculator.byHeight(stitchesHigh, originalImage, hasGaugeAdjustments, gaugeHigh, gaugeWide));
      this.debounceUpdateImage();
    } else if (stitchesWide) {
      this.setState(DimensionCalculator.byWidth(stitchesWide, originalImage, hasGaugeAdjustments, gaugeHigh, gaugeWide));
      this.debounceUpdateImage();
    }
  }

  onFileChange({ target: { files } }) {
    const file = files[0];
    ImageReader.readImage(file)
      .then(ImageProcessor.opaque)
      .then(image => {
        this.setState({originalImage: image});
        return image;        
      })
      .then(ImageSerializer.toSource)
      .then(imageSource => {
        this.setState({
          originalImageSource: imageSource,
          gaugeHigh: '',
          gaugeWide: '',
          hasGaugeAdjustments: false,
          gridColor: '#000000',
          stitchesHigh: '',
          stitchesWide: '',
          modifiedImageSource: null,
        });
      });
  }

  onGridColorChange({ target: { value: gridColor } }) {
    this.setState({ gridColor });
    this.debounceUpdateImage();
  }

  onStitchesHighChange({ target: { value } }) {
    this.onStitchesChange(value, DimensionCalculator.byHeight);
  }

  onStitchesWideChange({ target: { value } }) {
    this.onStitchesChange(value, DimensionCalculator.byWidth);
  }

  onStitchesChange(value, getDimensions) {
    const intValue = parseInt(value, 10);
    if (intValue) {
      const { originalImage, hasGaugeAdjustments, gaugeHigh, gaugeWide } = this.state;
      const { isHeightLastModified, stitchesHigh, stitchesWide } = getDimensions(intValue, originalImage, hasGaugeAdjustments, gaugeHigh, gaugeWide);
      this.setState({
        isHeightLastModified,
        stitchesHigh,
        stitchesWide,
      });
      this.debounceUpdateImage();
    } else {
      this.setState({
        gridColor: '#000000',
        stitchesHigh: '',
        stitchesWide: '',
        modifiedImageSource: null,
      });
    }
  }

  updateImage() {
    const { 
      colorQuantity,
      hasGaugeAdjustments,
      gaugeHigh,
      gaugeWide,
      gridColor, 
      originalImage, 
      stitchesHigh, 
      stitchesWide,
    } = this.state;
    if (originalImage && stitchesHigh && stitchesWide) {
      ImageProcessor.update(originalImage, colorQuantity, gridColor, stitchesHigh, stitchesWide, hasGaugeAdjustments, gaugeHigh, gaugeWide)
        .then(imageSource => this.setState({ modifiedImageSource: imageSource }));
    }
  }

  render() {
    const { originalImageSource, modifiedImageSource } = this.state;
    return (
      <div className="app">
        <header>
          <h1>KnitPix</h1>
        </header>
        <Grid>
          <Row className="show-grid">
            <Col xs={6} md={4}>
              <Sidebar 
                {...this.state}
                onColorQuantityChange={this.onColorQuantityChange.bind(this)}
                onGaugeHighChange={this.onGaugeHighChange.bind(this)}
                onGaugeWideChange={this.onGaugeWideChange.bind(this)}
                onFileChange={this.onFileChange.bind(this)}
                onHasGaugeAdjustmentChange={this.onHasGaugeAdjustmentChange.bind(this)}
                onGridColorChange={this.onGridColorChange.bind(this)}
                onStitchesHighChange={this.onStitchesHighChange.bind(this)}
                onStitchesWideChange={this.onStitchesWideChange.bind(this)}
              />
            </Col>
            <Col xs={6} md={4}>
              <OriginalImage src={originalImageSource} />
            </Col>
            <Col xs={6} md={4}>
              <ModifiedImage src={modifiedImageSource} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
