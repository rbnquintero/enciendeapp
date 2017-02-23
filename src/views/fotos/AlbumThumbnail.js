import React, { Component } from 'react';
import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';

class AlbumThumbnail extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.imageContainer}>
        <Image source={{uri:this.props.album.cover}} style={styles.image}>
          <Text style={styles.text}>{this.props.album.name}</Text>
        </Image>
      </TouchableOpacity>
    );
  }
}

const styles = {
  imageContainer: {
    margin:2, flexGrow:1, width:150, aspectRatio:1,
    flexDirection:'row', alignItems:'flex-end'
  },
  image: {
    flex: 1, aspectRatio:1,
    flexDirection:'row', alignItems:'flex-end',
    resizeMode: Image.resizeMode.cover
  },
  text: {
    padding: 10, fontWeight:'bold',
    color:'white',
    backgroundColor:'rgba(0,0,0,0)'
  }
}

module.exports = AlbumThumbnail;
