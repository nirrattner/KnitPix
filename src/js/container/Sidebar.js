import React, { Component } from 'react';

import FileChooser from './FileChooser';
import GaugeChooser from './GaugeChooser';
import GridColorChooser from './GridColorChooser';
import SizeChooser from './SizeChooser';

import '../../css/sidebar.css'

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <FileChooser {...this.props} />
        <SizeChooser {...this.props} />
        <GaugeChooser {...this.props} />
        <GridColorChooser {...this.props} />
      </div>
    );
  }
}

export default Sidebar;
