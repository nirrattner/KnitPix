import React, { Component } from 'react';
import { Image } from 'react-bootstrap';

import '../../css/modified-image.css'

class ModifiedImage extends Component {
  render() {
    const { src } = this.props;
    if (!src) {
      return null;
    }
    return (
      <div>
        <h2>Modified</h2>
        <Image className="modified-image" src={src} responsive={true} />
      </div>
    );
  }
}

export default ModifiedImage;
