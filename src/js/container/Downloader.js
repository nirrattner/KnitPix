import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Downloader extends Component {
  render() {
    const {
      modifiedImageSource,
      stitchesHigh,
      stitchesWide,
    } = this.props;
    if (!stitchesHigh && !stitchesWide) {
      return null;
    }

    return (
      <div>
        <h3>Step 5</h3>
        <Button
          href={modifiedImageSource}
          download="KnitPixImage"
        >
          Download image
        </Button>
      </div>
    );
  }
}

export default Downloader;
