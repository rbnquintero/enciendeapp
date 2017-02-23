import React, { Component } from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  Text
} from 'react-native';
var Header = require('../components/common/Header')
import AlbumThumbnail from './AlbumThumbnail'
import FotosAlbumFotos from './FotosAlbumFotos'

/* REDUX */
var { connect } = require('react-redux');
var {
  fetchAlbums
} = require('../../actions');

class FotosAlbums extends Component {
  componentDidMount() {
    this.props.fetchAlbums()
  }

  realGoToAlbum(album) {
    this.props.navigator.push({
      title: "FotosAlbumFotos",
      name: 'FotosAlbumFotos',
      component: FotosAlbumFotos,
      passProps: {item: album}
    });
  }

  goToAlbum(album) {
    if(this.props.user.isLoggedIn) {
      this.realGoToAlbum(album);
    } else {
      this.props.navigator.props.goToLogIn(this.realGoToAlbum(album));
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          title="Galería de fotos"
          leftItem={{
            layout: 'icon',
            title: 'Menu',
            icon: {uri:'hamburger'},
            onPress: this.props.navigator.props.openDrawer,
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
              {this.props.album.albums.map(function(item,index){
                return (
                  <AlbumThumbnail key={index} album={item} onPress={() => this.goToAlbum(item)}/>
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
    fetchAlbums: () => dispatch(fetchAlbums())
  };
}

module.exports = connect(select, actions)(FotosAlbums);
