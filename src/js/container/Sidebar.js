import React, { Component } from 'react';

import FileChooser from './FileChooser';
import SizeChooser from './SizeChooser';
import GridColorChooser from './GridColorChooser';

import '../../css/sidebar.css'

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <FileChooser {...this.props} />
        <SizeChooser {...this.props} />
        <GridColorChooser {...this.props} />
      </div>
    );
  }
}

export default Sidebar;
