import React, { Component } from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  Text
} from 'react-native';
var Header = require('../components/common/Header')
import Gallery from 'react-native-gallery';

class FotosAlbumFotosGallery extends Component {

  render() {
    return (
      <Gallery
        onSingleTapConfirmed={() => this.props.navigator.pop()}
        style={{flex: 1, backgroundColor: 'black'}}
        initialPage={this.props.index}
        images={this.props.gallery}
      />
    );
  }

}

module.exports = FotosAlbumFotosGallery;
