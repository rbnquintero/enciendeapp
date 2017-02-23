import React, { Component } from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  Text
} from 'react-native';
var Header = require('../components/common/Header')
import AlbumThumbnail from './AlbumThumbnail'
import FotosAlbumFotosGallery from './FotosAlbumFotosGallery'

/* REDUX */
var { connect } = require('react-redux');
var {
  fetchAlbumPhotos
} = require('../../actions');

class FotosAlbumFotos extends Component {
  componentDidMount() {
    this.props.fetchAlbumPhotos(this.props.item.id)
  }

  goToImage(index) {
    this.props.navigator.push({
      title: "FotosAlbumFotosGallery",
      name: 'FotosAlbumFotosGallery',
      fromBottom: true,
      component: FotosAlbumFotosGallery,
      passProps: {index: index, gallery: this.props.album.albumPhotosArrays[this.props.item.id]}
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          title={this.props.item.name}
          leftItem={{
            layout: 'icon',
            title: 'Menu',
            icon: {uri:'back'},
            onPress: this.props.navigator.pop,
          }}/>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.props.album.fetching}
                onRefresh={this.props.fetchAlbums}
                tintColor='rgba(255,255,255,0.7)'
              />
            }>
            <View style={{flex:1, flexWrap:'wrap', flexDirection:'row'}}>
              {this.props.album.albumPhotos[this.props.item.id].map(function(item,index){
                return (
                  <AlbumThumbnail key={index} album={item} onPress={() => this.goToImage(index)}/>
                );
              }, this)}
            </View>
          </ScrollView>
      </View>
    );
  }

}

function select(store) {
  return {
    nav: store.navReducer,
    app: store.appReducer,
    user: store.userReducer,
    album: store.albumsReducer,
  };
}

function actions(dispatch) {
  return {
    fetchAlbumPhotos: (albumId) => dispatch(fetchAlbumPhotos(albumId))
  };
}

module.exports = connect(select, actions)(FotosAlbumFotos);
