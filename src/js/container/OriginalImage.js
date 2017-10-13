import React, { Component } from 'react';
import { Image } from 'react-bootstrap';

import '../../css/original-image.css'

class OriginalImage extends Component {
  render() {
    const { src } = this.props;
    if (!src) {
      return null;
    }
    return (
      <div>
        <h2>Original</h2>
        <Image className="original-image" src={src} responsive={true} />
      </div>
    );
  }
}

export default OriginalImage;
