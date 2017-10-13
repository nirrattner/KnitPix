import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';

import { readImage, toImageSource } from './library/ImageReader';
import Jimp from './library/Jimp';
import Sidebar from './container/Sidebar';
import OriginalImage from './container/OriginalImage';
import ModifiedImage from './container/ModifiedImage';

import '../css/app.css'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gridColor: '#000000',
      modifiedImageSource: null,
      originalImage: null,
      originalImageSource: null,
      stitchesHigh: '',
      stitchesWide: '',      
    };
  }

  onFileChange({ target: { files } }) {
    const file = files[0];
    readImage(file)
      .then(image => {
        this.setState({originalImage: image});
        return image;        
      })
      .then(toImageSource)
      .then(imageSource => {
        this.setState({
          originalImageSource: imageSource,
          stitchesHigh: '',
          stitchesWide: '',
        });
      });
  }

  onGridColorChange({ target: { value: gridColor } }) {
    console.log(gridColor);
    this.setState({ gridColor });
  }

  onStitchesHighChange({ target: { value } }) {
    this.onStitchesChange(value, (stitchesHigh, originalImage) => ({
      stitchesHigh,
      stitchesWide: Math.round(stitchesHigh * originalImage.bitmap.width / originalImage.bitmap.height),
    }));
  }

  onStitchesWideChange({ target: { value } }) {
    this.onStitchesChange(value, (stitchesWide, originalImage) => ({
      stitchesHigh: Math.round(stitchesWide * originalImage.bitmap.height / originalImage.bitmap.width),
      stitchesWide,
    }));
  }

  onStitchesChange(value, getDimensions) {
    if (value) {
      const { originalImage } = this.state;
      const { stitchesHigh, stitchesWide } = getDimensions(parseInt(value, 10), originalImage);
      this.setState({
        stitchesHigh,
        stitchesWide,
      });
      this.updateImage({ originalImage, stitchesHigh, stitchesWide });
    } else {
      this.setState({
        gridColor: '#000000',
        stitchesHigh: '',
        stitchesWide: '',
        modifiedImageSource: null,
      });
    }
  }

  updateImage({ originalImage, stitchesHigh, stitchesWide }) {
    toImageSource(originalImage
      .clone()
      .resize(stitchesWide, stitchesHigh, Jimp.RESIZE_NEAREST_NEIGHBOR)
      .resize(originalImage.bitmap.width, originalImage.bitmap.height, Jimp.RESIZE_NEAREST_NEIGHBOR))
      .then(imageSource => this.setState({ modifiedImageSource: imageSource }));
  }

  render() {
    const {
      gridColor,
      modifiedImageSource,
      originalImage,
      originalImageSource,
      stitchesHigh,
      stitchesWide
    } = this.state;
    return (
      <div className="app">
        <header>
          <h1>KnitPix</h1>
        </header>
        <Grid>
          <Row className="show-grid">
            <Col xs={6} md={4}>
              <Sidebar 
                gridColor={gridColor}
                originalImage={originalImage}
                onFileChange={this.onFileChange.bind(this)}
                onGridColorChange={this.onGridColorChange.bind(this)}
                onStitchesHighChange={this.onStitchesHighChange.bind(this)}
                onStitchesWideChange={this.onStitchesWideChange.bind(this)}
                stitchesHigh={stitchesHigh}
                stitchesWide={stitchesWide}
              />
            </Col>
            <Col xs={6} md={4}>
              <OriginalImage src={originalImageSource} />
            </Col>
            <Col>
              <ModifiedImage src={modifiedImageSource} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
